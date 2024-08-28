import { Request, Response } from "express";
import { createAssessmentUseCase } from "../../../application/useCases/assessment/createAssessmentUseCase";
import { AssessmentRepository } from "../../../infrastructure/database/repositories/AssessmentRepository";
import {
  CustomError,
  isYupValidationError,
} from "../../../_lib/common/customError";
import { examSchema } from "../../../_lib/validation/assessement/createExam";

export const createAssessementController = async (
  req: Request,
  res: Response
) => {
  try {
    const examData = req.body;
    await examSchema.validate(examData, { abortEarly: false });
    const createAssessment = await createAssessmentUseCase(
      AssessmentRepository
    )(req.body);
    return res.status(200).json({ success: true, data: createAssessment });
  } catch (error) {
    if (isYupValidationError(error)) {
      return res.status(400).json({ errors: error.errors });
    } else {
      const customError = error as CustomError;
      console.error("Error creating assessment", customError);
      return res
        .status(500)
        .json({ message: customError.message || "Internal server error" });
    }
  }
};
