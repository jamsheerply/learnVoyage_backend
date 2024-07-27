import { CustomError } from "../../../_lib/common/customError";
import { chatEntity } from "../../../domain/entities/chatEntity";
import { ChatModel, UserModel } from "../models";

export const accessChat = async (
  currentUserId: string,
  userId: string
): Promise<chatEntity | null> => {
  try {
    const isChat1 = await ChatModel.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: currentUserId } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users")
      .populate("latestMessage")
      .exec();
    const isChat2 = await UserModel.populate(isChat1, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat2.length > 0) {
      return isChat2[0].toObject() as chatEntity;
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [currentUserId, userId],
      };
      const createdChat = await ChatModel.create(chatData);
      const fullChat = await ChatModel.findOne({
        _id: createdChat._id,
      }).populate("users");
      return fullChat?.toObject() as chatEntity;
    }
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(customError?.message);
  }
};
