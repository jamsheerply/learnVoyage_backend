import { CustomError } from "../../../_lib/common/customError";
import { ResultEntity } from "../../../domain/entities/resultEntity";
import { IResultRespository } from "../../../domain/interfaces/repositories/IResultRepository";

export const updateResultUseCase = (ResultRepository: IResultRespository) => {
  return async (reaultData: ResultEntity): Promise<ResultEntity | null> => {
    try {
      const updateResult = await ResultRepository.updateResult(reaultData);
      return updateResult;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
