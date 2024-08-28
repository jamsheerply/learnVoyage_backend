import { CustomError } from "../../../_lib/common/customError";
import { EnrollmentEntity } from "../../../domain/entities/enrollmentEntity";
import { IEnrollmentRepository } from "../../../domain/interfaces/repositories/IEnrollmentRespository";

export const readEnrollmentTopCoursesUseCase = (
  EnrollmentRepository: IEnrollmentRepository
) => {
  return async (): Promise<EnrollmentEntity[] | null> => {
    try {
      const readTopCourses = await EnrollmentRepository.readTopCourses();
      return readTopCourses;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
