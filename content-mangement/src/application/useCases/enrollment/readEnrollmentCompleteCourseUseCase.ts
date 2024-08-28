import { CustomError } from "../../../_lib/common/customError";
import { IEnrollmentRepository } from "../../../domain/interfaces/repositories/IEnrollmentRespository";
export const readEnrollmentCompleteCourseUseCase = (
  EnrollmentRepository: IEnrollmentRepository
) => {
  return async (
    userId: string
  ): Promise<{ courseName: string; completedPercentage: number }[]> => {
    try {
      const readCompleteCourse = await EnrollmentRepository.readCompleteCourse(
        userId
      );
      return readCompleteCourse;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
