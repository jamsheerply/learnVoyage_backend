import { Request, Response } from "express";
import { ResultRepository } from "../../../infrastructure/database/repositories/ResultRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";
import { readResultExamPassRateUseCase } from "../../../application/useCases/result/readResultExamPassRateUseCase";

export const readResultExamPassRateController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const resultExamPassRate = await readResultExamPassRateUseCase(
      ResultRepository
    )(userId!);
    return res.status(200).json({ success: true, data: resultExamPassRate });
  } catch (error) {
    const customError = error as CustomError;
    console.log("Error fetching result", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
