import { CustomError } from "../../../_lib/common/customError";
import { chatEntity } from "../../../domain/entities/chatEntity";
import { ChatModel } from "../models";

export const createGroupChat = async (
  chatName: string,
  users: string[],
  currentUserId: string
): Promise<chatEntity | null> => {
  try {
    const groupChat = await ChatModel.create({
      chatName: chatName,
      users: users,
      isGroupChat: true,
      groupAdmin: currentUserId,
    });
    const fullGroupchat = await ChatModel.findOne({ _id: groupChat._id })
      .populate("users")
      .populate("groupAdmin");
    return fullGroupchat as chatEntity;
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(customError.message);
  }
};
