import { Types } from "mongoose";

export interface courseEntity {
  _id: Types.ObjectId;
  courseName: string;
  courseThumbnailUrl: string;
  mentorId: Types.ObjectId;
}
