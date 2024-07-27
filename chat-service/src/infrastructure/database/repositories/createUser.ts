import { CustomError } from "../../../_lib/common/customError";
import { IUser } from "../../../domain/entities/IUser";
import { userEntity } from "../../../domain/entities/userEntity";
import { UserModel } from "../models";

export const createUser = async (data: IUser): Promise<userEntity | null> => {
  try {
    const existing = await UserModel.findOne({ email: data.email });

    if (existing) {
      return existing as userEntity;
    }
    const newData = {
      _id: data.id,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      pic: data.profile.avatar,
    };
    const newUser = await UserModel.create(newData);

    if (!newUser) {
      throw new Error("User creation failed");
    }

    return newUser as userEntity;
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(customError?.message);
  }
};
