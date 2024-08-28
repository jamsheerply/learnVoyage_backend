"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentModel = void 0;
const mongoose_1 = require("mongoose");
const questionShema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
    },
    options: {},
    answer: {
        type: String,
        required: true,
    },
});
const assessmentSchema = new mongoose_1.Schema({
    instructorId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Course",
    },
    questions: [questionShema],
    maximumTime: {
        type: Number,
        required: true,
    },
    passingPercentage: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.AssessmentModel = (0, mongoose_1.model)("Assessment", assessmentSchema);
