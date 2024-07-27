import { CustomError } from "../../../_lib/common/customError";
import { chatEntity } from "../../../domain/entities/chatEntity";
import { ChatModel } from "../models";

export const updateChatById = async (
  chatId: string,
  data: chatEntity
): Promise<chatEntity | null> => {
  try {
    const updatedChat = await ChatModel.findByIdAndUpdate(chatId, data, {
      new: true,
    })
      .populate("users")
      .populate("groupAdmin");
    return updatedChat as chatEntity;
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(customError.message);
  }
};
