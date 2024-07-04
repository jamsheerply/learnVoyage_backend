import mongoose, { Schema, Document } from "mongoose";
import { ICourse } from "../../../domain/entities/course.entity";

const lessonsSchema: Schema = new Schema({
  lessonId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

const courseSchema: Schema = new Schema(
  {
    mentorId: { type: String, required: true },
    courseName: { type: String, required: true },
    categoryId: { type: String, required: true },
    description: { type: String, required: true },
    language: { type: String, required: true },
    coursePrice: { type: Number, required: true },
    courseThumbnailUrl: { type: String, required: true },
    courseDemoVideoUrl: { type: String, required: true },
    id: { type: String },
    lessons: { type: [lessonsSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model<ICourse & Document>("Course", courseSchema);

export default CourseModel;
