import { Request, Response } from "express";
import { readRateAndReviewCourseIdUseCase } from "../../../application/useCases/rateAndReview/readRateAndReviewByCourseIdUseCase";
import { RateAndReviewRepository } from "../../../infrastructure/database/repositories/rateAndReviewRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";

export const readRateAndReviewCourseIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { courseId } = req.params;
    const resultByCourseId = await readRateAndReviewCourseIdUseCase(
      RateAndReviewRepository
    )(courseId);
    return res.status(200).json({ success: true, data: resultByCourseId });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error fetching rate and review bycourseId:", customError);
    return res.status(customError.statusCode || 500).json({
      success: false,
      error: customError.message || "Internal server error",
    });
  }
};
