import { CustomError } from "../../../_lib/common/customError";
import { PopulatedResult } from "../../../domain/entities/resultEntity";
import { IResultRespository } from "../../../domain/interfaces/repositories/IResultRepository";
export const readResultUseCase = (ResultRepository: IResultRespository) => {
  return async (queryData: {
    userId?: string;
    page: number;
    limit: number;
    search?: string;
    filter?: "completed" | "failed" | "pending";
  }): Promise<{
    total: number;
    page: number;
    limit: number;
    results: PopulatedResult[];
  } | null> => {
    try {
      const readResult = await ResultRepository.readResult(queryData);
      return readResult;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
