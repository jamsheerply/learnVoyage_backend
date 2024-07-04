import { Request, Response } from "express";
import { ICategory } from "../../../domain/entities/category.entity";
import { createCategoryUseCase } from "../../../application/useCases/category/createCategoryUseCase";
import { CategoryRepository } from "../../../infrastructure/database/repositories/category/CategoryRepositoryImpl.ts";

// This is the controller function to handle the request and response for creating a category
export const createCategoryController = async (req: Request, res: Response) => {
  try {
    // const { categoryName, image } = req.body;

    const newCategory: ICategory = {
      id: "",
      ...req.body,
    };

    const createdCategory = await createCategoryUseCase(CategoryRepository)(
      newCategory
    );
    console.log(createdCategory);
    if (!createdCategory) {
      // If category creation fails, send a 500 error response
      return res
        .status(500)
        .json({ success: false, error: "Failed to create category!" });
    }
    // Successful category creation
    return res.status(201).json({ success: true, data: createdCategory });
  } catch (error: any) {
    // Error handling for duplicate category
    if (error.message === "Category already exists") {
      return res
        .status(400)
        .json({ success: false, error: "Category already exists" });
    }
    // Generic error handling for other errors
    return res
      .status(500)
      .json({ success: false, error: "Failed to create category" });
  }
};
