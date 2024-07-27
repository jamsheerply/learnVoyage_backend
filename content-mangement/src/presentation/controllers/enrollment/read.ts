import { Request, Response } from "express";
import { readEnrollmentUseCase } from "../../../application/useCases/enrollment/readEnrollmentUseCase";
import { EnrollmentRepository } from "../../../infrastructure/database/repositories/enrollmentRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";

export const readEnrollmentController = async (req: Request, res: Response) => {
  try {
    const { page, limit, search, category, instructor, price } = req.query;

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
      instructor: Array.isArray(instructor)
        ? (instructor as string[])
        : instructor
        ? [instructor as string]
        : [],
      price: Array.isArray(price)
        ? (price as string[])
        : price
        ? [price as string]
        : [],
    };

    const readEnrollment = await readEnrollmentUseCase(EnrollmentRepository)(
      queryData
    );
    return res.status(200).json({ success: true, data: readEnrollment });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error creating enrollment", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
