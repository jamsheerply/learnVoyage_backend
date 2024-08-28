"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const readRateAndReviewByCourseIdValidationSchema = joi_1.default.object({
    userId: joi_1.default.string()
        .required()
        .custom((value, helpers) => {
        if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    })
        .messages({
        "any.required": "User ID is required",
        "string.empty": "User ID cannot be empty",
        "any.invalid": "Invalid User ID format",
    }),
    courseId: joi_1.default.string()
        .required()
        .custom((value, helpers) => {
        if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
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
exports.default = readRateAndReviewByCourseIdValidationSchema;
