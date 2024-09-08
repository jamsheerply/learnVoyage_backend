import { Types } from "mongoose";

export interface paymentEntityPop {
  _id: Types.ObjectId;
  userId: {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    role: "student" | "instructor" | "admin";
  };
  courseId: {
    _id: Types.ObjectId;
    courseName: string;
    courseThumbnailUrl: string;
    mentorId: {
      _id: Types.ObjectId;
      firstName: string;
      lastName: string;
      role: "student" | "instructor" | "admin";
    };
  };
  method: string;
  status: string;
  amount: number;
  createdAt: Date;
}
