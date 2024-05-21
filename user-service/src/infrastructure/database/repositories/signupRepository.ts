import { IUser } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";
import User from "../model/userModel";

export const signupRepository: IUserRepository = {
  async create(userData: IUser): Promise<IUser | null> {
    try {
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      throw new Error("failed to create user in database");
    }
  },
};
