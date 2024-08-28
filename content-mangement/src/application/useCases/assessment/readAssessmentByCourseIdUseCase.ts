import { CustomError } from "../../../_lib/common/customError";
import { AssessmentEntity } from "../../../domain/entities/assessmentEntity";
import { IAssessmentRepository } from "../../../domain/interfaces/repositories/IAssessmentRepository";

export const readAssessmentByCourseIdUseCase = (
  AssessmentRepository: IAssessmentRepository
) => {
  return async (courseId: string): Promise<AssessmentEntity | null> => {
    try {
      const readAssessmentByCourseId =
        await AssessmentRepository.readAssessmentByCourseId(courseId);
      return readAssessmentByCourseId;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
