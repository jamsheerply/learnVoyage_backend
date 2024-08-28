import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

export const getAllStudentUseCase = (userRepository: IUserRepository) => {
  return async () => {
    const data = await userRepository.getAllRole("student");
    return data;
  };
};
