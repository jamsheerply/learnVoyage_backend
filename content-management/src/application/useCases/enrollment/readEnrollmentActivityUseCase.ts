import { CustomError } from "../../../_lib/common/customError";
import { IEnrollmentRepository } from "../../../domain/interfaces/repositories/IEnrollmentRespository";

export const readEnrollmentActivityUseCase = (
  EnrollmentRepository: IEnrollmentRepository
) => {
  return async (
    userId: string
  ): Promise<{ date: Date; exam: string; enrollment: string } | null> => {
    try {
      const readActivity = await EnrollmentRepository.readEnrollmentActivity(
        userId
      );
      return readActivity;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
