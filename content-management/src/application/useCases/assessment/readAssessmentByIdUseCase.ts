import { CustomError } from "../../../_lib/common/customError";
import { AssessmentEntity } from "../../../domain/entities/assessmentEntity";
import { IAssessmentRepository } from "../../../domain/interfaces/repositories/IAssessmentRepository";

export const readAssessmentByIdUseCase = (
  AssessmentRepository: IAssessmentRepository
) => {
  return async (id: string): Promise<AssessmentEntity | null> => {
    try {
      const readAssessmentById = await AssessmentRepository.readAssessmentById(
        id
      );
      return readAssessmentById;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
