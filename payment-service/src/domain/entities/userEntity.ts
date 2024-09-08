import { Types } from "mongoose";

export interface userEntity {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  role: "student" | "instructor" | "admin";
}
