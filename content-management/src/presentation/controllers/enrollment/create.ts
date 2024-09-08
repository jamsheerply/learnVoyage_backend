import { Request, Response } from "express";
import { createEnrollmentUsecase } from "../../../application/useCases/enrollment/createEnrollmentUseCase";
import { EnrollmentRepository } from "../../../infrastructure/database/repositories/enrollmentRepositoryImp";
import { CustomError } from "../../../_lib/common/customError";
import { sendMessage } from "../../../infrastructure/messageBroker/producerRpc";

export const createEnrollmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const createEnrollment = await createEnrollmentUsecase(
      EnrollmentRepository
    )(req.body);

    if (!createEnrollment) {
      return res
        .status(500)
        .json({ success: false, error: "failed to create enrollment" });
    }

    return res.status(200).json({ success: true, data: createEnrollment });
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error create enrollment", error);
    return res
      .status(500)
      .json({ success: false, error: customError?.message });
  }
};
