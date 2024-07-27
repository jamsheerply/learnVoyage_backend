"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        ennum: ["pending", "completed", "failed"],
        required: true,
    },
    createdAt: {
        type: mongoose_1.Schema.Types.Date,
        default: function () {
            return Date.now();
        },
    },
    amount: {
        type: Number,
        required: true,
    },
});
exports.PaymentModel = (0, mongoose_1.model)("Payment", paymentSchema);
