import { Request, Response } from "express";
import { updateAssessmentUseCase } from "../../../application/useCases/assessment/updateAssessmentUseCase";
import { AssessmentRepository } from "../../../infrastructure/database/repositories/AssessmentRepository";
import { CustomError } from "../../../_lib/common/customError";

export const updateAssessmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const updateData = {
      _id: id,
      ...req.body,
    };

    const updatedAssessment = await updateAssessmentUseCase(
      AssessmentRepository
    )(updateData);

    if (!updatedAssessment) {
      return res.status(404).json({
        success: false,
        error: "Assessment not found or update failed",
      });
    }

    return res.status(200).json({ success: true, data: updatedAssessment });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error updating assessment", error);
    return res.status(500).json({
      success: false,
      error: customError?.message || "Internal server error",
    });
  }
};
