import { Request, Response } from "express";
import { readTotalRevenueUseCase } from "../../../application/useCases/enrollment/readTotalRevenueUseCase";
import { EnrollmentRepository } from "../../../infrastructure/database/repositories/enrollmentRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";

export const readTotalRevenueController = async (
  req: Request,
  res: Response
) => {
  try {
    const mentorId = req.user?.id;
    const readTotalRevenue = await readTotalRevenueUseCase(
      EnrollmentRepository
    )(mentorId?.toString()!);
    return res.status(200).json({ success: true, data: readTotalRevenue });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error fetching readEnrollmentCompleteCourse", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
