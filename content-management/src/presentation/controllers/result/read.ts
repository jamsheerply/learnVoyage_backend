import { Request, Response } from "express";
import { ResultRepository } from "../../../infrastructure/database/repositories/ResultRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";
import { readResultUseCase } from "../../../application/useCases/result/readResultUseCase";

export const readResultController = async (req: Request, res: Response) => {
  try {
    const { page, limit, search, filter } = req.query;

    const queryData = {
      userId: req.user?.role !== "admin" ? req.user?.id! : "",
      page: Number(page as string) || 1,
      limit: Number(limit as string) || 10,
      search: (search as string) || undefined,
      filter: (filter as "completed" | "failed" | "pending") || undefined,
    };
    const readResult = await readResultUseCase(ResultRepository)(queryData);
    return res.status(200).json({ success: true, data: readResult });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error reading result", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
