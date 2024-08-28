import * as Yup from "yup";
import mongoose from "mongoose";

// Custom validation method to check for valid MongoDB ObjectId
const isValidObjectId = (value: any) => {
  return mongoose.Types.ObjectId.isValid(value);
};

export const examSchema = Yup.object().shape({
  courseId: Yup.string()
    .required("Course is required")
    .test(
      "is-valid-objectid",
      "Course ID must be a valid ObjectId",
      isValidObjectId
    ),
  instructorId: Yup.string()
    .required("Instructor is required")
    .test(
      "is-valid-objectid",
      "Instructor ID must be a valid ObjectId",
      isValidObjectId
    ),
  passingPercentage: Yup.number()
    .min(0, "Passing percentage must be at least 0")
    .max(100, "Passing percentage must be at most 100")
    .required("Passing percentage is required"),
  maximumTime: Yup.string()
    .matches(/^\d+$/, "Maximum time must be a valid number")
    .required("Maximum time is required"),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string().required("Question is required"),
        options: Yup.array()
          .of(Yup.string().required("Option is required"))
          .min(4, "At least 4 options are required")
          .max(4, "No more than 4 options are allowed"),
        answer: Yup.string().required("Correct answer is required"),
      })
    )
    .min(1, "At least one question is required"),
});
