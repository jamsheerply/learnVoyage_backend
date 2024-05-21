import { IUser } from "../domain/entities/user.entity";
import { IUserRepository } from "../domain/interfaces/repositories/IUserRepository";
import { IHashingService } from "../domain/interfaces/services/IHashingService";

export const signupUseCase = (
  userRepository: IUserRepository,
  hashingService: IHashingService
) => {
  return async (userData: IUser) => {
    try {
      const hashedPassword = await hashingService.hash(userData.password);
      const newUser = await userRepository.create({
        ...userData,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      throw new Error("Failed to sign up user");
    }
  };
};
