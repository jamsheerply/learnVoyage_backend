import { Types } from "mongoose";

export interface sessionEntity {
  _id?: Types.ObjectId;
  sessionId: string;
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
}
