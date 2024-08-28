import { Request, Response } from "express";
import rateAndReviewValidationSchema from "../../../_lib/validation/rateAndReview/createRateAndReview";
import { createRateAndReviewUseCase } from "../../../application/useCases/rateAndReview/createRateAndReviewUseCase";
import { RateAndReviewRepository } from "../../../infrastructure/database/repositories/rateAndReviewRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";

export const createRateAndReviewController = async (
  req: Request,
  res: Response
) => {
  try {
    // Validate the request body
    const { error, value } = rateAndReviewValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ success: false, errors: errorMessages });
    }

    // Create the rate and review using the validated data
    const createRateAndReview = await createRateAndReviewUseCase(
      RateAndReviewRepository
    )(value);

    return res.status(201).json({ success: true, data: createRateAndReview });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error creating rateAndreview", customError);
    return res.status(customError.statusCode || 500).json({
      success: false,
      message: customError.message || "Internal server error",
    });
  }
};
