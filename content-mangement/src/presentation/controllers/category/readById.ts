import { Request, Response } from "express";
import { readByIdCategoryUseCase } from "../../../application/useCases/category/readByIdCategoryUseCase";
import { CategoryRepository } from "../../../infrastructure/database/repositories/CategoryRepositoryImpl.ts";

export const readByIdCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const readByIdCategory = await readByIdCategoryUseCase(CategoryRepository)(
      id
    );
    return res.status(200).json({ success: true, data: readByIdCategory });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
