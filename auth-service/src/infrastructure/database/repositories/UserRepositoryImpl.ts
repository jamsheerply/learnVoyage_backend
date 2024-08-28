import UserModel from "../models/userModel";
import { IUser } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";
import { Document } from "mongoose";
import { userEntity } from "../../../domain/entities/userEntity";
import { CustomError } from "../../../_lib/common/customError";

interface IUserWithId extends IUser, Document {
  _id: string;
  id: string;
}

export const UserRepository: IUserRepository = {
  addUser: async (user: IUser): Promise<IUser> => {
    const newUser = new UserModel(user);
    await newUser.save();
    const userObject = newUser.toObject() as IUserWithId;
    userObject.id = userObject._id.toString();
    return userObject;
  },
  getUserByEmail: async (email: string): Promise<IUser | null> => {
    const user = await UserModel.findOne({ email });
    if (user) {
      const userObject = user.toObject() as IUserWithId;
      userObject.id = userObject._id.toString();
      return userObject;
    }
    return null;
  },
  getUserById: async (userId: string): Promise<IUser | null> => {
    const user = await UserModel.findById(userId);
    if (user) {
      const userObject = user.toObject() as IUserWithId;
      userObject.id = userObject._id.toString();
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
      userObject.id = userObject._id.toString();
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
  getProfileById: async (id: string) => {
    try {
      const profileById = await UserModel.findById(id);
      return profileById as userEntity;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  updateProfile: async (userData: userEntity) => {
    try {
      const { _id, ...rest } = userData;
      // console.log("rest", rest);
      const updatedProfile = await UserModel.findByIdAndUpdate(
        userData._id,
        rest,
        { new: true }
      );
      // console.log("repository", updatedProfile);
      return updatedProfile as userEntity;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  readTotalStudentsAndInstructors: async () => {
    try {
      const readUser = await UserModel.aggregate([
        {
          $match: {
            isVerified: true,
            role: { $in: ["student", "instructor"] },
          },
        },
        {
          $group: {
            _id: "$role",
            total: { $sum: 1 },
          },
        },
      ]);
      console.log("readUser", readUser);
      return {
        totalIntructors: readUser[0].total,
        totalStudents: readUser[1].total,
      };
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  // readTopInstructors:async()=>{
  //   try {

  //   } catch (error) {

  //   }
  // }
};
