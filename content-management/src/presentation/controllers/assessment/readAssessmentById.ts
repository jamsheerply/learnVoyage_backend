import { Request, Response } from "express";
import { CustomError } from "../../../_lib/common/customError";
import { AssessmentRepository } from "../../../infrastructure/database/repositories/AssessmentRepository";
import { readAssessmentByIdUseCase } from "../../../application/useCases/assessment/readAssessmentByIdUseCase";

export const readAssessmentByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const assessmentById = await readAssessmentByIdUseCase(
      AssessmentRepository
    )(id);
    if (!assessmentById) {
      return res
        .status(404)
        .json({ success: false, error: "Assessment not found" });
    }
    return res.status(200).json({ success: true, data: assessmentById });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error fetching assessment", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
