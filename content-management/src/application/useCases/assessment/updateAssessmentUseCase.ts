import { CustomError } from "../../../_lib/common/customError";
import { AssessmentEntity } from "../../../domain/entities/assessmentEntity";
import { IAssessmentRepository } from "../../../domain/interfaces/repositories/IAssessmentRepository";

export const updateAssessmentUseCase = (
  AssessmentRepository: IAssessmentRepository
) => {
  return async (
    updateData: AssessmentEntity
  ): Promise<AssessmentEntity | null> => {
    try {
      // Call the repository to update the assessment
      const updatedAssessment = await AssessmentRepository.updateAssessment(
        updateData
      );

      // Return the updated assessment
      return updatedAssessment;
    } catch (error) {
      const customError = error as CustomError;

      // Rethrow the original error or throw a custom error
      throw new Error(customError?.message || "Failed to update assessment");
    }
  };
};
