import { Request, Response } from "express";
import { updateCategoryUseCase } from "../../../application/useCases/category/updateCategoryUseCase";
import { CategoryRepository } from "../../../infrastructure/database/repositories/CategoryRepositoryImpl.ts";

export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const updatedCategory = await updateCategoryUseCase(CategoryRepository)(
      req.body
    );
    if (!updatedCategory) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to update category!" });
    }
    return res.status(200).json({ success: true, data: updatedCategory });
  } catch (error: any) {
    if (error.message === "Category not found") {
      return res
        .status(404)
        .json({ success: false, error: "Category not found" });
    }
    return res.status(500).json({ success: false, error: error.message });
  }
};
