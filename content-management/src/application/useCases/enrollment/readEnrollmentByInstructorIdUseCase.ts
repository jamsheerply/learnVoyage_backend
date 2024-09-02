import { CustomError } from "../../../_lib/common/customError";
import { IEnrollmentRepository } from "../../../domain/interfaces/repositories/IEnrollmentRespository";

export const readEnrollmentByInstructorIdUseCase = (
  EnrollmentRepository: IEnrollmentRepository
) => {
  return async (mentorId: string): Promise<number | null> => {
    try {
      const totalEnrollment = await EnrollmentRepository.readByInstructorId(
        mentorId
      );
      return totalEnrollment;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
