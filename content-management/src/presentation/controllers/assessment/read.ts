import { Request, Response } from "express";
import { readAssessmentUseCase } from "../../../application/useCases/assessment/readAssessmentUseCase";
import { AssessmentRepository } from "../../../infrastructure/database/repositories/AssessmentRepository";
import { CustomError } from "../../../_lib/common/customError";

export const readAssessementController = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, limit, search, category, instructor } = req.query;

    // Convert query parameters to the expected types
    const queryData = {
      userId: req.user?.role !== "admin" ? req.user?.id! : "",
      page: parseInt(page as string, 10) || 1,
      limit: parseInt(limit as string, 10) || 10,
      search: (search as string) || undefined,
      category: Array.isArray(category)
        ? (category as string[])
        : category
        ? [category as string]
        : [],
      instructor: Array.isArray(instructor)
        ? (instructor as string[])
        : instructor
        ? [instructor as string]
        : [],
    };
    const readAssessment = await readAssessmentUseCase(AssessmentRepository)(
      queryData
    );
    return res.status(200).json({ success: true, data: readAssessment });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error creating assessment", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
