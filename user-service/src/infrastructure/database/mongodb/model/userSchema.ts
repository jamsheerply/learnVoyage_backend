import mongoose, { Schema } from "mongoose";
import { Iuser } from "../../../../domain/entities/user.entity";

const userSchema: Schema = new Schema({
  firstName: { type: String },
  email: { type: Number },
  password: { type: String },
});

const User = mongoose.model<Iuser>("User", userSchema);
export default User;
