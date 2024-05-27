import { IUser } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";
import User from "../models/userModel";

export const UserRepository: IUserRepository = {
  async addUser(userData: IUser): Promise<IUser | null> {
    try {
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      throw new Error("failed to create user in database");
    }
  },
  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await User.findOne({ email }).lean();
      return user;
    } catch (error) {
      throw new Error("failed to find user by email in database");
    }
  },
};
