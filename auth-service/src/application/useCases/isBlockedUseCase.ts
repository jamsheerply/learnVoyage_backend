import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

export const isBlockedUseCase = (userRepository: IUserRepository) => {
  return async (id: string): Promise<boolean> => {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user.isBlocked;
  };
};
