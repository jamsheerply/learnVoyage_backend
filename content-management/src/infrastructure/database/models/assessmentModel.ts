import { model, Schema, Types } from "mongoose";
import { AssessmentEntity } from "../../../domain/entities/assessmentEntity";

const questionShema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: {},
  answer: {
    type: String,
    required: true,
  },
});

const assessmentSchema = new Schema(
  {
    instructorId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    questions: [questionShema],
    maximumTime: {
      type: Number,
      required: true,
    },
    passingPercentage: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AssessmentModel = model<AssessmentEntity>(
  "Assessment",
  assessmentSchema
);
