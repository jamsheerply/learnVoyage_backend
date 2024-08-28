import { rateAndReviewEntity } from "../../entities/rateAndReviewEntity";

export interface IRateAndReviewRepository {
  createRateAndReview(
    rateAndReviewData: rateAndReviewEntity
  ): Promise<rateAndReviewEntity | null>;
  readRateAndReviewByUserId(
    userId: string,
    courseId: string
  ): Promise<rateAndReviewEntity | null>;
  readRateAndReviewByCourseId(
    courseId: string
  ): Promise<rateAndReviewEntity[] | null>;
}
