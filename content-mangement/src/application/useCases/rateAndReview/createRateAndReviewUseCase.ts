import { CustomError } from "../../../_lib/common/customError";
import { rateAndReviewEntity } from "../../../domain/entities/rateAndReviewEntity";
import { IRateAndReviewRepository } from "../../../domain/interfaces/repositories/IRateAndReviewRepository";

export const createRateAndReviewUseCase = (
  RateAndReviewRepository: IRateAndReviewRepository
) => {
  return async (
    rateAndReviewData: rateAndReviewEntity
  ): Promise<rateAndReviewEntity | null> => {
    try {
      const crateRateAndReview =
        await RateAndReviewRepository.createRateAndReview(rateAndReviewData);
      return crateRateAndReview;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
