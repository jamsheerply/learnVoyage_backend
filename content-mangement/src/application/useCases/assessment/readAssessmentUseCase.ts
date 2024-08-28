import { CustomError } from "../../../_lib/common/customError";
import { AssessmentEntity } from "../../../domain/entities/assessmentEntity";
import { IAssessmentRepository } from "../../../domain/interfaces/repositories/IAssessmentRepository";

export const readAssessmentUseCase = (
  AssessmentRepository: IAssessmentRepository
) => {
  return async (queryData: {
    userId: string;
    page: number;
    limit: number;
    search?: string;
  }): Promise<{
    total: number;
    page: number;
    limit: number;
    assessments: AssessmentEntity[];
  } | null> => {
    try {
      const readAssessment = await AssessmentRepository.readAssessment(
        queryData
      );
      return readAssessment;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
