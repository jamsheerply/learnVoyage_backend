import { CustomError } from "../../../_lib/common/customError";
import { EnrollmentEntity } from "../../../domain/entities/enrollmentEntity";
import { IEnrollmentRepository } from "../../../domain/interfaces/repositories/IEnrollmentRespository";

export const getEnrollmentCourseIdUseCase = (
  enrollmentRepository: IEnrollmentRepository
) => {
  return async (
    courseId: string,
    userId: string
  ): Promise<EnrollmentEntity | null> => {
    try {
      const getEnrollmentByUserId =
        await enrollmentRepository.getEnrollmentByCourseId(courseId, userId);
      return getEnrollmentByUserId;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
