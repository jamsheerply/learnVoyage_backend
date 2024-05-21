import mongoose, { Schema } from "mongoose";
import { IUser } from "../../../domain/entities/user.entity";

const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser & mongoose.Document>("User", userSchema);

export default User;
