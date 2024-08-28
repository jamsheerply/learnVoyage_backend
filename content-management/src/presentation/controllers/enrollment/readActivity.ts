import { Request, Response } from "express";
import { readEnrollmentActivityUseCase } from "../../../application/useCases/enrollment/readEnrollmentActivityUseCase";
import { EnrollmentRepository } from "../../../infrastructure/database/repositories/enrollmentRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";

export const readEnrollmentActivityController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const enrollmentActivity = await readEnrollmentActivityUseCase(
      EnrollmentRepository
    )(userId!);
    return res.status(200).json({ success: true, data: enrollmentActivity });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error fetching readEnrollmentActivity", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
