import { Request, Response } from "express";
import { readRateAndReviewUserIdUseCase } from "../../../application/useCases/rateAndReview/readRateAndReviewUserIdUseCase";
import { RateAndReviewRepository } from "../../../infrastructure/database/repositories/rateAndReviewRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";
import readRateAndReviewByCourseIdValidationSchema from "../../../_lib/validation/rateAndReview/readByCourseId";

export const readRateAndReviewUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, error: "User not authenticated" });
    }

    const { error, value } =
      readRateAndReviewByCourseIdValidationSchema.validate(
        { userId, courseId },
        { abortEarly: false }
      );

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ success: false, errors: errorMessages });
    }

    const resultByCourseId = await readRateAndReviewUserIdUseCase(
      RateAndReviewRepository
    )(value.userId, value.courseId);

    if (!resultByCourseId) {
      return res
        .status(200)
        .json({ success: false, error: "Rate and review not found" });
    }

    return res.status(200).json({ success: true, data: resultByCourseId });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error fetching rate and review:", customError);
    return res.status(customError.statusCode || 500).json({
      success: false,
      error: customError.message || "Internal server error",
    });
  }
};
