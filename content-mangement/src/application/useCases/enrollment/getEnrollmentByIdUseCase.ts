import { CustomError } from "../../../_lib/common/customError";
import { EnrollmentEntity } from "../../../domain/entities/enrollmentEntity";
import { IEnrollmentRepository } from "../../../domain/interfaces/repositories/IEnrollmentRespository";

export const getEnrollmentByIdUseCase = (
  EnrollmentRepository: IEnrollmentRepository
) => {
  return async (id: string): Promise<EnrollmentEntity | null> => {
    try {
      const getEnrollmentById = await EnrollmentRepository.getEnrollmentById(
        id
      );
      return getEnrollmentById;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
