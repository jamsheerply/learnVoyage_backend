import { CustomError } from "../../../_lib/common/customError";
import { AssessmentEntity } from "../../../domain/entities/assessmentEntity";
import { IAssessmentRepository } from "../../../domain/interfaces/repositories/IAssessmentRepository";

export const createAssessmentUseCase = (
  AssessmentRepository: IAssessmentRepository
) => {
  return async (
    createData: AssessmentEntity
  ): Promise<AssessmentEntity | null> => {
    try {
      const createAssessment = await AssessmentRepository.createAssessment(
        createData
      );
      return createAssessment;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
