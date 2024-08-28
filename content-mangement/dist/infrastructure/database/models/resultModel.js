"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultModel = void 0;
const mongoose_1 = require("mongoose");
const resultSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assessmentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Assessment",
        required: true,
    },
    status: {
        type: String,
        enum: ["completed", "failed", "pending"],
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.ResultModel = (0, mongoose_1.model)("Result", resultSchema);
