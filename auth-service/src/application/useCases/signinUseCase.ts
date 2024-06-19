// // src/application/usecases/signinService.ts
// import { IUserRepository } from '../../domain/interfaces/repositories/IUserRepository';
// import { IHashingService } from '../../domain/interfaces/services/IHashingService';
// import { IUser } from '../../domain/entities/user.entity';

// export const signinService = (userRepository: IUserRepository, hashingService: IHashingService) => {
//   return async (userData: { email: string; password: string }): Promise<IUser | null> => {
//     const user = await userRepository.getUserByEmail(userData.email);
//     if (!user) {
//       throw new Error('User not found');
//     }

//     const isPasswordValid = await hashingService.compare(userData.password, user.password);
//     if (!isPasswordValid) {
//       throw new Error('Invalid password');
//     }

//     return user;
//   };
// };

// src/application/usecases/signinService.ts
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { IHashingService } from "../../domain/interfaces/services/IHashingService";
import { IUser } from "../../domain/entities/user.entity";

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
