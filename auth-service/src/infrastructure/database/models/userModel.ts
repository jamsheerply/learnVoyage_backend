import mongoose, { Schema } from "mongoose";
import { IUser } from "../../../domain/entities/user.entity";

const userSchema: Schema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
});

const User = mongoose.model<IUser & mongoose.Document>("User", userSchema);

export default User;
