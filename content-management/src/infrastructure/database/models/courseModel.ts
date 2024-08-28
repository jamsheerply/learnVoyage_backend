import mongoose, { Schema, Document } from "mongoose";
import { ICourse } from "../../../domain/entities/course.entity";

const lessonsSchema: Schema = new Schema({
  lessonId: { type: String, required: true },
  lessonTitle: { type: String, required: true },
  description: { type: String, required: true },
  video: {
    publicId: String,
    version: String,
  },
});

const courseSchema: Schema = new Schema(
  {
    mentorId: { type: String, required: true },
    courseName: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: { type: String, required: true },
    language: { type: String, required: true },
    coursePrice: { type: Number, required: true },
    courseThumbnailUrl: { type: String, required: true },
    courseDemoVideo: {
      publicId: String,
      version: String,
    },
    id: { type: String },
    isBlocked: { type: Boolean, default: false },
    reason: { type: String },
    lessons: { type: [lessonsSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model<ICourse & Document>("Course", courseSchema);

export default CourseModel;
