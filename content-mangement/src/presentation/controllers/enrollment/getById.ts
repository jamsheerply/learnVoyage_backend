import { Request, Response } from "express";
import { EnrollmentRepository } from "../../../infrastructure/database/repositories/enrollmentRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";
import { getEnrollmentByIdUseCase } from "../../../application/useCases/enrollment/getEnrollmentByIdUseCase";

export const getEnrollmentByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const enrollment = await getEnrollmentByIdUseCase(EnrollmentRepository)(id);

    if (!enrollment) {
      return res
        .status(404) // Changed status code to 404 for not found
        .json({ success: false, error: "Enrollment not found" });
    }

    return res.status(200).json({ success: true, data: enrollment });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error fetching enrollment", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
