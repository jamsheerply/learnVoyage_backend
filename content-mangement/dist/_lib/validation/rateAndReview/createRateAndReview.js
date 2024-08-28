"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const rateAndReviewValidationSchema = joi_1.default.object({
    userId: joi_1.default.string()
        .custom((value, helpers) => {
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    })
        .required()
        .messages({
        "any.invalid": "Invalid userId format",
        "any.required": "userId is required",
    }),
    courseId: joi_1.default.string()
        .custom((value, helpers) => {
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    })
        .required()
        .messages({
        "any.invalid": "Invalid courseId format",
        "any.required": "courseId is required",
    }),
    rating: joi_1.default.number().min(1).max(5).required().messages({
        "number.base": "Rate must be a number",
        "number.min": "Rate must be at least 1",
        "number.max": "Rate must be at most 5",
        "any.required": "Rate is required",
    }),
    review: joi_1.default.string().required().min(10).max(1000).messages({
        "string.base": "Review must be a string",
        "string.empty": "Review cannot be empty",
        "string.min": "Review must be at least 10 characters long",
        "string.max": "Review cannot exceed 1000 characters",
        "any.required": "Review is required",
    }),
});
exports.default = rateAndReviewValidationSchema;
