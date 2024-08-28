import { CustomError } from "../../../_lib/common/customError";
import { IRateAndReviewRepository } from "../../../domain/interfaces/repositories/IRateAndReviewRepository";
import { RateAndReviewModal } from "../models/rateAndReviewModel";

export const RateAndReviewRepository: IRateAndReviewRepository = {
  createRateAndReview: async (rateAndReviewData) => {
    try {
      const newRateAndReview = await RateAndReviewModal.create(
        rateAndReviewData
      );
      await newRateAndReview.populate("courseId");
      return newRateAndReview;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  readRateAndReviewByUserId: async (userId, courseId) => {
    try {
      const readByUserId = await RateAndReviewModal.findOne({
        userId,
        courseId,
      });

      return readByUserId;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  readRateAndReviewByCourseId: async (courseId) => {
    try {
      const readByCourseId = await RateAndReviewModal.find({
        courseId,
      })
        .populate("courseId")
        .sort({ createdAt: -1 });
      return readByCourseId;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
};
