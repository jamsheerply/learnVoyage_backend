import { CustomError } from "../../../_lib/common/customError";
import { IResultRespository } from "../../../domain/interfaces/repositories/IResultRepository";

export const readResultExamPassRateUseCase = (
  ResultRepository: IResultRespository
) => {
  return async (
    userId: string
  ): Promise<{ passed: number; failed: number; pending: number } | null> => {
    try {
      const readResultExamPassRate =
        await ResultRepository.readResultExamsPassRate(userId);
      return readResultExamPassRate;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
