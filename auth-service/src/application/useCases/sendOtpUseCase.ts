import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { sendMessage } from "../../infrastructure/messageBroker/producerRpc";

export const sendOtpUseCase = (UserRepository: IUserRepository) => {
  return async (userId: string, email: string) => {
    try {
      // Generate and send OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await UserRepository.updateOtp(userId, otp);

      const data = {
        email: email,
        message: otp,
      };

      // send-otp in user-service
      sendMessage(
        "notification-service",
        { type: "sendOtp", data: data },
        (response: any) => {
          // Specify the type of response as any or more specific type if known
          console.log("Response notification-service:", response);
          // Handle the response here
        }
      );

      return true;
    } catch (error: any) {
      throw new Error(error.message || "Failded to resent otp");
    }
  };
};
