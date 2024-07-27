import { CustomError } from "../../../_lib/common/customError";
import { chatEntity } from "../../../domain/entities/chatEntity";
import { ChatModel } from "../models";

export const removeFromGroupChat = async (
  chatId: string,
  userId: string
): Promise<chatEntity | null> => {
  try {
    const removeFromGroupChat = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users")
      .populate("groupAdmin");

    return removeFromGroupChat as chatEntity;
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(customError.message);
  }
};
