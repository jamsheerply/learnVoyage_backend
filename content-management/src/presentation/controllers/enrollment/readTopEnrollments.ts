import { Request, Response } from "express";
import { readTopEnrollmentUseCase } from "../../../application/useCases/enrollment/readTopEnrollmentUSeCase";
import { EnrollmentRepository } from "../../../infrastructure/database/repositories/enrollmentRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";

export const readTopEnrollmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const mentorId = req.user?.id;
    const topEnrollment = await readTopEnrollmentUseCase(EnrollmentRepository)(
      mentorId?.toString()!
    );
    return res.status(200).json({ success: true, data: topEnrollment });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error read recent enrollment", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
