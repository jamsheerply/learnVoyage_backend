import Joi from "joi";
import mongoose from "mongoose";

const readRateAndReviewByCourseIdValidationSchema = Joi.object({
  userId: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "any.required": "User ID is required",
      "string.empty": "User ID cannot be empty",
      "any.invalid": "Invalid User ID format",
    }),
  courseId: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "any.required": "Course ID is required",
      "string.empty": "Course ID cannot be empty",
      "any.invalid": "Invalid Course ID format",
    }),
});

export default readRateAndReviewByCourseIdValidationSchema;
