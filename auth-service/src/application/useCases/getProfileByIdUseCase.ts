import { CustomError } from "../../_lib/common/customError";
import { userEntity } from "../../domain/entities/userEntity";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

export const getProfileByIdUseCase = (userRepository: IUserRepository) => {
  return async (id: string): Promise<userEntity | null> => {
    try {
      const user = await userRepository.getUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
