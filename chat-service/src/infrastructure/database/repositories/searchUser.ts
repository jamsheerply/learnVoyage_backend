import { CustomError } from "../../../_lib/common/customError";
import { userEntity } from "../../../domain/entities/userEntity";
import { UserModel } from "../models";

export const searchUser = async (
  keyword: string,
  currentId: string
): Promise<userEntity[]> => {
  try {
    const keywordData = keyword
      ? {
          $or: [
            {
              name: { $regex: keyword, $options: "i" },
            },
            {
              email: { $regex: keyword, $options: "i" },
            },
          ],
        }
      : {};

    const users = await UserModel.find(keywordData)
      .find({
        _id: { $ne: currentId },
      })
      .lean();

    return users as userEntity[];
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(customError?.message);
  }
};
