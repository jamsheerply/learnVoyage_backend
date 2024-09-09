import { IUser } from "../../entities/user.entity";
import { userEntity } from "../../entities/userEntity";

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
  getProfileById(id: string): Promise<userEntity | null>;
  updateProfile(userData: userEntity): Promise<userEntity | null>;
  readTotalStudentsAndInstructors: () => Promise<{
    totalStudents: number;
    totalInstructors: number;
  }>;
  readAllRole(queryData: {
    role: string;
    page: number;
    limit: number;
    search?: string;
    filter?: string;
  }): Promise<{
    total: number;
    page: number;
    limit: number;
    users: IUser[];
  }>;
  // readTopInstructors(): Promise<IUser | null>;
}
