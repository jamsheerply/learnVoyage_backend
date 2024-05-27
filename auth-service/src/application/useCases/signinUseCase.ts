import { IUser } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { IHashingService } from "../../domain/interfaces/services/IHashingService";

export const signinUseCase = (
  userRepository: IUserRepository,
  hashingService: IHashingService
) => {
  return async (userData: IUser) => {
    const user = await userRepository.findByEmail(userData.email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await hashingService.compare(
      userData.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return user;
  };
};
