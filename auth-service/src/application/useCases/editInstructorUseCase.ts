import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

export const editInstructorUseCase = (userRepository: IUserRepository) => {
  return async (id: string, isBlocked: boolean) => {
    const data = await userRepository.editInstructor(id, isBlocked);
    return data;
  };
};
