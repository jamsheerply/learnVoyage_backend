import { Request, Response } from "express";
import { readCoursesStatusUseCase } from "../../../application/useCases/enrollment/readCoursesStatusUseCase";
import { EnrollmentRepository } from "../../../infrastructure/database/repositories/enrollmentRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";

export const readCoursesStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const readCourseStatus = await readCoursesStatusUseCase(
      EnrollmentRepository
    )();
    return res.status(200).json({ success: true, data: readCourseStatus });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error read recent enrollment", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
