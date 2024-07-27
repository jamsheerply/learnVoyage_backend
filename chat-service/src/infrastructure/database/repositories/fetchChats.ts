import { CustomError } from "../../../_lib/common/customError";
import { chatEntity } from "../../../domain/entities/chatEntity";
import { ChatModel, UserModel } from "../models";

export const fetchChats = async (
  currentUserId: string
): Promise<chatEntity[] | null> => {
  try {
    // Find chats where the current user is a participant
    const results = await ChatModel.find({
      users: { $elemMatch: { $eq: currentUserId } },
    })
      .populate("users") // Populate user details
      .populate("groupAdmin") // Populate group admin details
      .populate("latestMessage") // Populate latest message details
      .sort({ updatedAt: -1 }) // Sort by the updated time in descending order
      .exec(); // Execute the query

    // Populate the sender details of the latest message in each chat
    const populatedResults = await UserModel.populate(results, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    console.log("populatedResults", JSON.stringify(populatedResults));
    // Convert the results to plain objects and cast them to chatEntity
    return populatedResults.map((result) => result.toObject() as chatEntity);
  } catch (error) {
    // Handle any errors that occur
    const customError = error as CustomError;
    throw new Error(customError?.message);
  }
};
