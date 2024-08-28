import { Types } from "mongoose";

export interface ResultEntity {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  assessmentId: Types.ObjectId;
  status: "completed" | "failed" | "pending";
  score: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface PopulatedAssessment {
  _id: Types.ObjectId;
  courseId: {
    _id: Types.ObjectId;
    courseName: string;
    categoryId: {
      _id: Types.ObjectId;
      categoryName: string;
    };
  };
}

export interface PopulatedResult extends Omit<ResultEntity, "assessmentId"> {
  assessmentId: PopulatedAssessment;
}
