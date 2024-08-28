import { Request, Response } from "express";
import { EnrollmentRepository } from "../../../infrastructure/database/repositories/enrollmentRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";
import { readEnrollmentCompleteCourseUseCase } from "../../../application/useCases/enrollment/readEnrollmentCompleteCourseUseCase";

export const readEnrollmentCompleteCourseController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const enrollmentCompletedCourse = await readEnrollmentCompleteCourseUseCase(
      EnrollmentRepository
    )(userId!);
    return res
      .status(200)
      .json({ success: true, data: enrollmentCompletedCourse });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error fetching readEnrollmentCompleteCourse", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
