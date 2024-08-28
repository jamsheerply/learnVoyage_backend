import { Types } from "mongoose";
import { IResultRespository } from "../../../domain/interfaces/repositories/IResultRepository";
import { ResultEntity } from "../../../domain/entities/resultEntity";
import { CustomError } from "../../../_lib/common/customError";

export const readResultByAssessmentIdUseCase = (
  ResultRepository: IResultRespository
) => {
  return async (
    userId: string,
    assessmentId: string
  ): Promise<ResultEntity | null> => {
    try {
      const readResultByAssessmentId =
        await ResultRepository.readResultByAssessmentId(userId, assessmentId);
      return readResultByAssessmentId;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
