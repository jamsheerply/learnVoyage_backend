import { CustomError } from "../../../_lib/common/customError";
import { chatEntity } from "../../../domain/entities/chatEntity";
import { ChatModel } from "../models";

export const readGroupChatByName = async (
  chatName: string
): Promise<chatEntity | null> => {
  try {
    console.log("chatName", chatName);
    const groupChatByName = await ChatModel.findOne({
      chatName,
    });
    return groupChatByName as chatEntity;
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(customError?.message);
  }
};
