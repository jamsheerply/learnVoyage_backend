import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../../../domain/entities/user.entity";

const userSchema: Schema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    default: "student",
  },
  profile: {
    avatar: { type: String },
    dob: { type: String },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
  },
  contact: {
    additionalEmail: { type: String },
    phone: { type: String },
    socialMedia: {
      instagram: String,
      linkedIn: String,
      github: String,
    },
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  profession: { type: String },
  otp: { type: String },
  profit: {
    type: Number,
    default: 0,
  },
});

const UserModel = mongoose.model<IUser & Document>("User", userSchema);

export default UserModel;
