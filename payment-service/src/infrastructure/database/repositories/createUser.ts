import { CustomError } from "../../../_lib/common/customError";
import { userEntity } from "../../../domain/entities/userEntity";
import { UserModel } from "../models";

export const createUser = async (data: userEntity): Promise<userEntity> => {
  try {
    const newUser = await UserModel.create(data);
    if (!newUser) {
      throw new Error("user creation failed");
    }
    return newUser;
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(customError?.message);
  }
};
