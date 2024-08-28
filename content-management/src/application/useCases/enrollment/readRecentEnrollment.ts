import { CustomError } from "../../../_lib/common/customError";
import { EnrollmentEntity } from "../../../domain/entities/enrollmentEntity";
import { IEnrollmentRepository } from "../../../domain/interfaces/repositories/IEnrollmentRespository";

export const readRecentEnrollmentUseCase = (
  EnrollmentRepository: IEnrollmentRepository
) => {
  return async (userId: string): Promise<EnrollmentEntity[] | null> => {
    try {
      const readRecentEnrollment =
        await EnrollmentRepository.readRecentEnrollment(userId);
      return readRecentEnrollment;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
