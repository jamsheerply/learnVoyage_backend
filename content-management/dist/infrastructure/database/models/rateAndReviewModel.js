"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateAndReviewModal = void 0;
const mongoose_1 = require("mongoose");
const rateAndReviewSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.RateAndReviewModal = (0, mongoose_1.model)("RateAndReview", rateAndReviewSchema);
