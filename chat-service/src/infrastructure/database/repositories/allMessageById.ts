import { CustomError } from "../../../_lib/common/customError";
import { chatEntity } from "../../../domain/entities/chatEntity";
import { MessageModel } from "../models";

export const allMessageById = async (
  chatId: string
): Promise<chatEntity[] | null> => {
  try {
    const allMessageByID = await MessageModel.find({ chat: chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    return allMessageByID as chatEntity[];
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(customError?.message);
  }
};
