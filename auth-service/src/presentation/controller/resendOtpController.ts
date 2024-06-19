import { Request, Response } from "express";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import { sendOtpUseCase } from "../../application/useCases/sendOtpUseCase";

export const resendOtpController = async (req: Request, res: Response) => {
  try {
    const { userId, email } = req.body;

    const sendOtp = await sendOtpUseCase(UserRepository)(userId, email);
    if (!sendOtp) {
      return res
        .status(500)
        .json({ sucess: false, error: "failed to resend otp !" });
    }
    return res
      .status(201)
      .json({ success: true, data: "otp send successfully" });
  } catch (error) {}
};
