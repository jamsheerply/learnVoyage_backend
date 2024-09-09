import { CustomError } from "../../_lib/common/customError";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

export const readTotalStudnetAndInstructorUseCase = (
  UserRepository: IUserRepository
) => {
  return async (): Promise<{
    totalStudents: number;
    totalInstructors: number;
  }> => {
    try {
      const totalStudnetsAndInstructors =
        await UserRepository.readTotalStudentsAndInstructors();
      return totalStudnetsAndInstructors;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
