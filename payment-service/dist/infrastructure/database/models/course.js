"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModal = exports.courseSchema = void 0;
const mongoose_1 = require("mongoose");
exports.courseSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
});
exports.CourseModal = (0, mongoose_1.model)("Course", exports.courseSchema);
