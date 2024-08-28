import { Request, Response } from "express";
import { readRecentEnrollmentUseCase } from "../../../application/useCases/enrollment/readRecentEnrollment";
import { EnrollmentRepository } from "../../../infrastructure/database/repositories/enrollmentRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";

export const readRecentEnrollmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const readRecentEnrollment = await readRecentEnrollmentUseCase(
      EnrollmentRepository
    )(userId!);
    return res.status(200).json({ success: true, data: readRecentEnrollment });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error read recent enrollment", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
