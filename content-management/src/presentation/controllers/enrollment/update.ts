import { Request, Response } from "express";
import { EnrollmentRepository } from "../../../infrastructure/database/repositories/enrollmentRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";
import { updateEnrollmentUseCase } from "../../../application/useCases/enrollment/updateEnrollmentUseCase";

export const updateEnrollmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const updateData = {
      _id: id,
      ...req.body,
    };

    const updateEnrollment = await updateEnrollmentUseCase(
      EnrollmentRepository
    )(updateData);
    if (!updateEnrollment) {
      return res.status(404).json({
        success: false,
        error: "Enrollment not found or update failed",
      });
    }
    return res.status(200).json({ success: true, data: updateEnrollment });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error updating Enrollment", error);
    return res.status(500).json({
      success: false,
      error: customError?.message || "Internal server error",
    });
  }
};
