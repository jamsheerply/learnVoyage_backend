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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const lessonsSchema = new mongoose_1.Schema({
    lessonId: { type: String, required: true },
    lessonTitle: { type: String, required: true },
    description: { type: String, required: true },
    video: {
        publicId: String,
        version: String,
    },
});
const courseSchema = new mongoose_1.Schema({
    mentorId: { type: String, required: true },
    courseName: { type: String, required: true },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const CourseModel = mongoose_1.default.model("Course", courseSchema);
exports.default = CourseModel;
