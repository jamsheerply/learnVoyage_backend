import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, reqiured: true },
    email: { type: String, requred: true },
    password: { type: String },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
