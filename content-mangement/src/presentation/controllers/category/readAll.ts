import { Request, Response } from "express";
import { readAllCategoryUseCase } from "../../../application/useCases/category/readAllCategoryUseCase";
import { CategoryRepository } from "../../../infrastructure/database/repositories/category/CategoryRepositoryImpl.ts";

export const readAllCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const readAllCategory = await readAllCategoryUseCase(CategoryRepository)();
    return res.status(200).json({ success: true, data: readAllCategory }); // Use 200 OK for read operations
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
