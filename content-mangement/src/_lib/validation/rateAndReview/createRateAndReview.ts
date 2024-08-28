import Joi from "joi";
import { Types } from "mongoose";

const rateAndReviewValidationSchema = Joi.object({
  userId: Joi.string()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required()
    .messages({
      "any.invalid": "Invalid userId format",
      "any.required": "userId is required",
    }),
  courseId: Joi.string()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required()
    .messages({
      "any.invalid": "Invalid courseId format",
      "any.required": "courseId is required",
    }),
  rating: Joi.number().min(1).max(5).required().messages({
    "number.base": "Rate must be a number",
    "number.min": "Rate must be at least 1",
    "number.max": "Rate must be at most 5",
    "any.required": "Rate is required",
  }),
  review: Joi.string().required().min(10).max(1000).messages({
    "string.base": "Review must be a string",
    "string.empty": "Review cannot be empty",
    "string.min": "Review must be at least 10 characters long",
    "string.max": "Review cannot exceed 1000 characters",
    "any.required": "Review is required",
  }),
});

export default rateAndReviewValidationSchema;
