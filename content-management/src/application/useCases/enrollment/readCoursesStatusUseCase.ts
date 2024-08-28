import { CustomError } from "../../../_lib/common/customError";
import { EnrollmentEntity } from "../../../domain/entities/enrollmentEntity";
import { IEnrollmentRepository } from "../../../domain/interfaces/repositories/IEnrollmentRespository";

export const readCoursesStatusUseCase = (
  EnrollmentRepository: IEnrollmentRepository
) => {
  return async (): Promise<EnrollmentEntity[] | null> => {
    try {
      const readCourseStatus = await EnrollmentRepository.readCourseStatus();
      return readCourseStatus;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
