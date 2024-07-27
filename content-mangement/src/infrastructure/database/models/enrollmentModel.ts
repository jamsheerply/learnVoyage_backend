import { model, Schema } from "mongoose";
import { EnrollmentEntity } from "../../../domain/entities/enrollmentEntity";

const enrollmentSchema = new Schema({
  userId: {
    type: String,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  enrolledAt: {
    type: Schema.Types.Date,
    default: function () {
      return Date.now();
    },
  },
  progress: {
    completedLessons: [Schema.Types.ObjectId],
    completedAssessments: [Schema.Types.ObjectId],
  },
});

export const EnrollmentModel = model<EnrollmentEntity>(
  "enrollments",
  enrollmentSchema
);
