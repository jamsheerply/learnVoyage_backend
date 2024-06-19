import { IUser } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import { sendMessageToQueue } from "../../infrastructure/messaging/producer";
import { generateCorrelationId } from "../../infrastructure/utility/correlationId";

export const sendOtpUseCase = (UserRepository: IUserRepository) => {
  return async (userId: string, email: string) => {
    try {
      // Generate and send OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await UserRepository.updateOtp(userId, otp);

      const correlationId = generateCorrelationId();

      await sendMessageToQueue(
        "notification-service",
        JSON.stringify({
          email: email,
          message: otp,
          type: "otp",
          correlationId,
        })
      );

      return true;
    } catch (error: any) {
      throw new Error(error.message || "Failded to resent otp");
    }
  };
};
