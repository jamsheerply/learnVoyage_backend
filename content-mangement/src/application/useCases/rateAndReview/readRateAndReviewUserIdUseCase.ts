import { CustomError } from "../../../_lib/common/customError";
import { rateAndReviewEntity } from "../../../domain/entities/rateAndReviewEntity";
import { IRateAndReviewRepository } from "../../../domain/interfaces/repositories/IRateAndReviewRepository";

export const readRateAndReviewUserIdUseCase = (
  RateAndReviewRepository: IRateAndReviewRepository
) => {
  return async (
    UserId: string,
    courseId: string
  ): Promise<rateAndReviewEntity | null> => {
    try {
      const readById = await RateAndReviewRepository.readRateAndReviewByUserId(
        UserId,
        courseId
      );
      return readById;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
