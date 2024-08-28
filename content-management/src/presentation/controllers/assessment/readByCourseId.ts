import { Request, Response } from "express";
import { readAssessmentByCourseIdUseCase } from "../../../application/useCases/assessment/readAssessmentByCourseIdUseCase";
import { AssessmentRepository } from "../../../infrastructure/database/repositories/AssessmentRepository";
import { CustomError } from "../../../_lib/common/customError";

export const readAssessmentByCourseIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { courseId } = req.params;
    const assessmentByCourseId = await readAssessmentByCourseIdUseCase(
      AssessmentRepository
    )(courseId);
    if (!assessmentByCourseId) {
      return res
        .status(200)
        .json({ success: false, error: "Assessment not found" });
    }
    return res.status(200).json({ success: true, data: assessmentByCourseId });
  } catch (error) {
    const customError = error as CustomError;
    console.log("Error fetching assessment", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
