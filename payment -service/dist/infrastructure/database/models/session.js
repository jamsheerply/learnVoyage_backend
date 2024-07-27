"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = void 0;
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    sessionId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
});
exports.SessionModel = (0, mongoose_1.model)("Session", sessionSchema);
