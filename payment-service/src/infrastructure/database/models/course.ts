import { model, Schema } from "mongoose";

export const courseSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseThumbnailUrl: {
    type: String,
    required: true,
  },
  mentorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const CourseModal = model("Course", courseSchema);
