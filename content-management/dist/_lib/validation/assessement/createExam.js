"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.examSchema = void 0;
const Yup = __importStar(require("yup"));
const mongoose_1 = __importDefault(require("mongoose"));
// Custom validation method to check for valid MongoDB ObjectId
const isValidObjectId = (value) => {
    return mongoose_1.default.Types.ObjectId.isValid(value);
};
exports.examSchema = Yup.object().shape({
    courseId: Yup.string()
        .required("Course is required")
        .test("is-valid-objectid", "Course ID must be a valid ObjectId", isValidObjectId),
    instructorId: Yup.string()
        .required("Instructor is required")
        .test("is-valid-objectid", "Instructor ID must be a valid ObjectId", isValidObjectId),
    passingPercentage: Yup.number()
        .min(0, "Passing percentage must be at least 0")
        .max(100, "Passing percentage must be at most 100")
        .required("Passing percentage is required"),
    maximumTime: Yup.string()
        .matches(/^\d+$/, "Maximum time must be a valid number")
        .required("Maximum time is required"),
    questions: Yup.array()
        .of(Yup.object().shape({
        question: Yup.string().required("Question is required"),
        options: Yup.array()
            .of(Yup.string().required("Option is required"))
            .min(4, "At least 4 options are required")
            .max(4, "No more than 4 options are allowed"),
        answer: Yup.string().required("Correct answer is required"),
    }))
        .min(1, "At least one question is required"),
});
