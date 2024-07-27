import { CustomError } from "../../../_lib/common/customError";
import { messageEntity } from "../../../domain/entities/messageEntity";
import { ChatModel, MessageModel, UserModel } from "../models";

export const createMessage = async (
  currentUserId: string,
  chatId: string,
  content: string
): Promise<messageEntity | null> => {
  try {
    const newMessage = {
      sender: currentUserId,
      content: content,
      chat: chatId,
    };

    // Create a new message
    let message = await MessageModel.create(newMessage);

    // Populate the sender field
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await ChatModel.populate(message, {
      path: "chat.latestMessage",
    });
    message = await ChatModel.populate(message, {
      path: "chat.latestMessage.sender",
    });
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    // Update the latest message in the chat
    const updatedChat = await ChatModel.findByIdAndUpdate(
      chatId,
      { latestMessage: message },
      { new: true }
    );

    // console.log("Created Message:", message);

    return message as messageEntity;
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(customError?.message);
  }
};
