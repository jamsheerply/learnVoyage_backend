import { CustomError } from "../../../_lib/common/customError";
import { ResultEntity } from "../../../domain/entities/resultEntity";
import { IResultRespository } from "../../../domain/interfaces/repositories/IResultRepository";

export const createResultUseCase = (ResultRepository: IResultRespository) => {
  return async (resultData: ResultEntity): Promise<ResultEntity | null> => {
    try {
      const createResult = await ResultRepository.createResult(resultData);
      return createResult;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
