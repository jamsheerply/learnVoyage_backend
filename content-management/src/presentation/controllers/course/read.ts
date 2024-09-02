import { Request, Response } from "express";
import { CourseRepository } from "../../../infrastructure/database/repositories/CourseRepository";
import { CustomError } from "../../../_lib/common/customError";
import { readCourseUseCase } from "../../../application/useCases/course/readCourseUseCase";

export const readCourseController = async (req: Request, res: Response) => {
  try {
    const { page, limit, search, category, price } = req.query;

    // Convert query parameters to the expected types
    const queryData = {
      userId: req.user?.id!,
      page: parseInt(page as string, 10) || 1,
      limit: parseInt(limit as string, 10) || 10,
      search: (search as string) || undefined,
      category: Array.isArray(category)
        ? (category as string[])
        : category
        ? [category as string]
        : [],
      price: Array.isArray(price)
        ? (price as string[])
        : price
        ? [price as string]
        : [],
    };

    const readCourse = await readCourseUseCase(CourseRepository)(queryData);
    return res.status(200).json({ success: true, data: readCourse });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error read enrollment", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
