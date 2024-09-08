import { CustomError } from "../../../_lib/common/customError";
import { EnrollmentEntity } from "../../../domain/entities/enrollmentEntity";
import { IEnrollmentRepository } from "../../../domain/interfaces/repositories/IEnrollmentRespository";

export const readTopEnrollmentUseCase = (
  EnrollmentRepository: IEnrollmentRepository
) => {
  return async (
    mentorId: string
  ): Promise<
    {
      courseName: number;
      numberOfEnrollments: number;
      numberOfComments: number | null;
      greatestRating: number | null;
      coursePrice: number;
    }[]
  > => {
    try {
      const readTopEnrollment = await EnrollmentRepository.readTopEnrollments(
        mentorId
      );
      return readTopEnrollment;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
