import { Request, Response } from "express";
import { createResultUseCase } from "../../../application/useCases/result/createResultUseCase";
import { ResultRepository } from "../../../infrastructure/database/repositories/ResultRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";

export const createResultController = async (req: Request, res: Response) => {
  try {
    const createResult = await createResultUseCase(ResultRepository)(req.body);
    if (!createResult) {
      return res
        .status(500)
        .json({ success: false, error: "failed to create result" });
    }
    return res.status(200).json({ success: true, data: createResult });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error create result", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
