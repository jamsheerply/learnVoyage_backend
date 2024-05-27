import { IUser } from "../domain/entities/user.entity";
import { IUserRepository } from "../domain/interfaces/repositories/IUserRepository";
import { IHashingService } from "../domain/interfaces/services/IHashingService";

export const signinUseCase = (
  userRepository: IUserRepository,
  hashingService: IHashingService
) => {
  return async (
    email: string,
    password: string
  ): Promise<Omit<IUser, "password">> => {
    try {
      const user = await userRepository.findByEmail(email);

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await hashingService.compare(
        password,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword as Omit<IUser, "password">;
    } catch (error) {
      throw new Error("Failed to sign in user");
    }
  };
};
