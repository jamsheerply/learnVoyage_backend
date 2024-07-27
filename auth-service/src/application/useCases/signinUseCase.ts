// src/application/usecases/signinService.ts
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { IHashingService } from "../../domain/interfaces/services/IHashingService";
import { IUser } from "../../domain/entities/user.entity";
import { generateCorrelationId } from "../../infrastructure/utility/correlationId";
import { sendMessageToQueue } from "../../infrastructure/messaging/producer";

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
    console.log(user.isVerified);
    if (user?.isVerified) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await userRepository.updateOtp(user.id, otp);

      const correlationId = generateCorrelationId();

      await sendMessageToQueue(
        "notification-service-2",
        JSON.stringify({
          email: user.email,
          message: otp,
          type: "otp",
          correlationId,
        })
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
