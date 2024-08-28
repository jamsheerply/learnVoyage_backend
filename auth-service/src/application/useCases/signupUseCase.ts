import { IUser } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { IHashingService } from "../../domain/interfaces/services/IHashingService";
import { sendMessage } from "../../infrastructure/messageBroker/producerRpc";
export const signupUseCase = (
  userRepository: IUserRepository,
  hashingService: IHashingService
) => {
  return async (userData: IUser) => {
    try {
      // Check if email already exists
      const existingUser = await userRepository.getUserByEmail(userData.email);
      if (existingUser) {
        throw new Error("Email already exists");
      }

      const hashedPassword = await hashingService.hash(userData.password);

      // Generate and send OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const newUser = await userRepository.addUser({
        ...userData,
        password: hashedPassword,
        isVerified: false,
        otp,
      });

      await userRepository.updateOtp(newUser.id, otp);

      const data = {
        email: newUser.email,
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

      return newUser;
    } catch (error: any) {
      throw new Error(error.message || "Failed to sign up user");
    }
  };
};
