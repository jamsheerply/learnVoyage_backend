import UserModel from "../models/userModel";
import { IUser } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";
import { Document } from "mongoose";

interface IUserWithId extends IUser, Document {
  _id: string;
  id: string;
}

export const UserRepository: IUserRepository = {
  addUser: async (user: IUser): Promise<IUser> => {
    const newUser = new UserModel(user);
    await newUser.save();
    const userObject = newUser.toObject() as IUserWithId;
    userObject.id = userObject._id.toString(); // Map _id to id and convert to string
    return userObject;
  },
  getUserByEmail: async (email: string): Promise<IUser | null> => {
    const user = await UserModel.findOne({ email });
    if (user) {
      const userObject = user.toObject() as IUserWithId;
      userObject.id = userObject._id.toString(); // Map _id to id and convert to string
      return userObject;
    }
    return null;
  },
  getUserById: async (userId: string): Promise<IUser | null> => {
    const user = await UserModel.findById(userId);
    if (user) {
      const userObject = user.toObject() as IUserWithId;
      userObject.id = userObject._id.toString(); // Map _id to id and convert to string
      return userObject;
    }
    return null;
  },
  updateUserVerificationStatus: async (
    userId: string,
    isVerified: boolean
  ): Promise<void> => {
    await UserModel.findByIdAndUpdate(userId, { isVerified });
  },
  updateOtp: async (userId: string, otp: string | null): Promise<void> => {
    await UserModel.findByIdAndUpdate(userId, { otp });
  },
  getAllRole: async (role: string): Promise<IUser[]> => {
    const users = await UserModel.find({ role });
    return users.map((user) => {
      const userObject = user.toObject() as IUserWithId;
      userObject.id = userObject._id.toString(); // Map _id to id and convert to string
      return userObject;
    });
  },
  editInstructor: async (id: string, isBlocked: boolean): Promise<IUser[]> => {
    await UserModel.updateOne({ _id: id }, { isBlocked });
    const instructors = await UserModel.find({ role: "instructor" });
    return instructors.map((user) => {
      const userObject = user.toObject() as IUserWithId;
      userObject.id = userObject._id.toString();
      return userObject;
    });
  },
};