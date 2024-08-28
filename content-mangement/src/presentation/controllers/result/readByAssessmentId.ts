import { Request, Response } from "express";
import { ResultRepository } from "../../../infrastructure/database/repositories/ResultRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";
import { readResultByAssessmentIdUseCase } from "../../../application/useCases/result/readResultByAssessmentIdUseCase";

export const readResultByAssessmentIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { assessmentId } = req.params;
    const userId = req.user?.id!;
    const resultByAssessmentId = await readResultByAssessmentIdUseCase(
      ResultRepository
    )(userId, assessmentId);

    if (!resultByAssessmentId) {
      return res
        .status(200)
        .json({ success: false, error: "Result not found" });
    }
    return res.status(200).json({ success: true, data: resultByAssessmentId });
  } catch (error) {
    const customError = error as CustomError;
    console.log("Error fetching result", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
