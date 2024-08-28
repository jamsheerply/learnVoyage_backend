"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentModel = void 0;
const mongoose_1 = require("mongoose");
const enrollmentSchema = new mongoose_1.Schema({
    userId: {
        type: String,
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Course",
    },
    enrolledAt: {
        type: mongoose_1.Schema.Types.Date,
        default: function () {
            return Date.now();
        },
    },
    progress: {
        completedLessons: [mongoose_1.Schema.Types.ObjectId],
        completedAssessments: [mongoose_1.Schema.Types.ObjectId],
    },
});
exports.EnrollmentModel = (0, mongoose_1.model)("enrollments", enrollmentSchema);
