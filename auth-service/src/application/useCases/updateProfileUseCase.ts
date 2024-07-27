import { CustomError } from "../../_lib/common/customError";
import { userEntity } from "../../domain/entities/userEntity";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

export const updateProfileUseCase = (userRepository: IUserRepository) => {
  return async (userData: userEntity): Promise<userEntity | null> => {
    try {
      const updatedUser = await userRepository.updateProfile(userData);
      if (!updatedUser) {
        throw new Error("User update failed");
      }
      // console.log(updatedUser);
      return updatedUser;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
