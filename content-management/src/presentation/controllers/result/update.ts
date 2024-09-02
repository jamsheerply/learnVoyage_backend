import { Request, Response } from "express";
import { CustomError } from "../../../_lib/common/customError";
import { updateResultUseCase } from "../../../application/useCases/result/updateResultUseCase";
import { ResultRepository } from "../../../infrastructure/database/repositories/ResultRepositoryImp";

export const updateResultController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updateData = {
      _id: id,
      ...req.body,
    };

    const updateResult = await updateResultUseCase(ResultRepository)(
      updateData
    );
    if (!updateResult) {
      return res.status(200).json({
        success: false,
        error: "Result not found or update failed",
      });
    }
    return res.status(200).json({ success: true, data: updateResult });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error create result", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
