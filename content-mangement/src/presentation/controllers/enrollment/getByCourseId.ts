import { Request, Response } from "express";
import { EnrollmentRepository } from "../../../infrastructure/database/repositories/enrollmentRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";
import { getEnrollmentCourseIdUseCase } from "../../../application/useCases/enrollment/getEnrollemntCourseIdUseCase";

export const getEnrollmentByCourseIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.id;
    const enrollmentByCourseId = await getEnrollmentCourseIdUseCase(
      EnrollmentRepository
    )(courseId, userId!);

    if (!enrollmentByCourseId) {
      return res
        .status(404) // Changed status code to 404 for not found
        .json({ success: false, error: "Enrollment not found" });
    }
    return res.status(200).json({ success: true, data: enrollmentByCourseId });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error fetching enrollment", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
