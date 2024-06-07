// src/application/usecases/verifyOtpUseCase.ts
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

export const verifyOtpUseCase = (userRepository: IUserRepository) => {
  return async (userId: string, otp: string) => {
    try {
      const user = await userRepository.getUserById(userId);

      if (user && user.otp === otp) {
        await userRepository.updateUserVerificationStatus(userId, true);
        await userRepository.updateOtp(userId, null);
        return true;
      }

      return false;
    } catch (error) {
      throw new Error("Failed to verify OTP");
    }
  };
};
