import { Types } from "mongoose";

export interface rateAndReviewEntity {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  rating: number;
  review: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
