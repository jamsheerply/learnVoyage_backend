import { Request, Response } from "express";
import { EnrollmentRepository } from "../../../infrastructure/database/repositories/enrollmentRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";
import { readEnrollmentByInstructorIdUseCase } from "../../../application/useCases/enrollment/readEnrollmentByInstructorIdUseCase";

export const readEnrollmentByInstructorIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const mentorId = req.user?.id;
    const readByInstructorId = await readEnrollmentByInstructorIdUseCase(
      EnrollmentRepository
    )(mentorId?.toString()!);
    return res.status(200).json({ success: true, data: readByInstructorId });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error fetching readEnrollmentCompleteCourse", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
