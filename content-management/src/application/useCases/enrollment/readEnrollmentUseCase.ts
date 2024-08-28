import { CustomError } from "../../../_lib/common/customError";
import { EnrollmentEntity } from "../../../domain/entities/enrollmentEntity";
import { IEnrollmentRepository } from "../../../domain/interfaces/repositories/IEnrollmentRespository";

export const readEnrollmentUseCase = (
  enrollmentRepository: IEnrollmentRepository
) => {
  return async (queryData: {
    userId: string;
    page: number;
    limit: number;
    search?: string;
    category?: string[];
    instructor?: string[];
    price?: string[];
  }): Promise<{
    total: number;
    page: number;
    limit: number;
    enrollments: EnrollmentEntity[];
  } | null> => {
    try {
      const readEnrollment = await enrollmentRepository.readEnrollment(
        queryData
      );
      return readEnrollment;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
