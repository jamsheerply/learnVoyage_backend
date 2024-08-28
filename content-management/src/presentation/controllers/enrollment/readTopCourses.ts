import { Request, Response } from "express";
import { readEnrollmentTopCoursesUseCase } from "../../../application/useCases/enrollment/readEnrollmentTopCoursesUseCase";
import { EnrollmentRepository } from "../../../infrastructure/database/repositories/enrollmentRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";

export const readTopCoursesController = async (req: Request, res: Response) => {
  try {
    const readTopCourses = await readEnrollmentTopCoursesUseCase(
      EnrollmentRepository
    )();
    return res.status(200).json({ success: true, data: readTopCourses });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error read recent enrollment", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
