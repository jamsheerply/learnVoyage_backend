import { CustomError } from "../../../_lib/common/customError";
import { rateAndReviewEntity } from "../../../domain/entities/rateAndReviewEntity";
import { IRateAndReviewRepository } from "../../../domain/interfaces/repositories/IRateAndReviewRepository";

export const readRateAndReviewCourseIdUseCase = (
  RateAndReviewRepository: IRateAndReviewRepository
) => {
  return async (courseId: string): Promise<rateAndReviewEntity[] | null> => {
    try {
      const readByCourseId =
        await RateAndReviewRepository.readRateAndReviewByCourseId(courseId);
      return readByCourseId;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
