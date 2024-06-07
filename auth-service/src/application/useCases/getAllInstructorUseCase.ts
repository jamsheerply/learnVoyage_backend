import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

export const getAllInstructorUseCase = (userRepository: IUserRepository) => {
  return async () => {
    const data = await userRepository.getAllRole("instructor");
    return data;
  };
};
