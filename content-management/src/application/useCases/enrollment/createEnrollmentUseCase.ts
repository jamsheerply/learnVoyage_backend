import { CustomError } from "../../../_lib/common/customError";
import { EnrollmentEntity } from "../../../domain/entities/enrollmentEntity";
import { paymentEntity } from "../../../domain/entities/paymentEntity";
import { IEnrollmentRepository } from "../../../domain/interfaces/repositories/IEnrollmentRespository";
export const createEnrollmentUsecase = (
  EnrollmentRepository: IEnrollmentRepository
) => {
  return async (
    enrollmentData: paymentEntity
  ): Promise<EnrollmentEntity | null> => {
    try {
      const createEnrollment = await EnrollmentRepository.createEnrollment(
        enrollmentData
      );
      return createEnrollment;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
