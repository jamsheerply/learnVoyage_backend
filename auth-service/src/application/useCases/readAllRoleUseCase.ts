import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { IUser } from "../../domain/entities/user.entity";

export const readAllRoleUseCase = (userRepository: IUserRepository) => {
  return async (queryData: {
    role: string;
    page: number;
    limit: number;
    search?: string;
    filter?: string;
  }): Promise<{
    total: number;
    page: number;
    limit: number;
    users: IUser[];
  }> => {
    try {
      const result = await userRepository.readAllRole(queryData);
      return result;
    } catch (error) {
      console.error("Error in readAllRoleUseCase:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to read all users: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while reading all users");
      }
    }
  };
};
