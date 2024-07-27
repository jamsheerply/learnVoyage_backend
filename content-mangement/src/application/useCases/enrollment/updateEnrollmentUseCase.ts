import { CustomError } from "../../../_lib/common/customError";
import { EnrollmentEntity } from "../../../domain/entities/enrollmentEntity";
import { IEnrollmentRepository } from "../../../domain/interfaces/repositories/IEnrollmentRespository";
export const updateEnrollmentUseCase = (
  EnrollmentRepository: IEnrollmentRepository
) => {
  return async (
    enrollmentData: EnrollmentEntity
  ): Promise<EnrollmentEntity | null> => {
    try {
      const updateEnrollment = await EnrollmentRepository.updateEnrollment(
        enrollmentData
      );
      return updateEnrollment;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
