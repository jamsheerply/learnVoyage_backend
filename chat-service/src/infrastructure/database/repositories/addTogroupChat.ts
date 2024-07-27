import { CustomError } from "../../../_lib/common/customError";
import { chatEntity } from "../../../domain/entities/chatEntity";
import { ChatModel } from "../models";

export const addToGroupChat = async (
  chatId: string,
  userId: string
): Promise<chatEntity | null> => {
  try {
    const addedToGroupChat = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
      .populate("users")
      .populate("groupAdmin");

    return addedToGroupChat as chatEntity;
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(customError.message);
  }
};
