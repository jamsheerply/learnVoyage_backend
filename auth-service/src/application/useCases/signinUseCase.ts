import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { IHashingService } from "../../domain/interfaces/services/IHashingService";
import { IUser } from "../../domain/entities/user.entity";
import { sendMessage } from "../../infrastructure/messageBroker/producerRpc";

export const signinUseCase = (
  userRepository: IUserRepository,
  hashingService: IHashingService
) => {
  return async (userData: {
    email: string;
    password: string;
  }): Promise<IUser | null> => {
    const user = await userRepository.getUserByEmail(userData.email);

    if (!user) {
      throw new Error("User not found");
    }

    if (!user?.isVerified) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await userRepository.updateOtp(user.id, otp);

      const data = {
        email: user.email,
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
    }

    const isPasswordValid = await hashingService.compare(
      userData.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid user credential");
    }

    return user;
  };
};
