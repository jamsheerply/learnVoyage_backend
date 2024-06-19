import { IUser } from "../../entities/user.entity";

export interface IUserRepository {
  addUser(user: IUser): Promise<IUser>;
  getUserByEmail(email: string): Promise<IUser | null>;
  updateUserVerificationStatus(
    userId: string,
    isVerified: boolean
  ): Promise<void>;
  updateOtp(userId: string, otp: string | null): Promise<void>;
  getUserById(userId: string): Promise<IUser | null>;
  getAllRole(role: string): Promise<IUser[]>;
  editInstructor(id: string, isBlocked: boolean): Promise<IUser[]>;
}
