"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadTransations = void 0;
const models_1 = require("../models");
const downloadTransations = (startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {};
        if (startDate && endDate) {
            query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        const transactions = yield models_1.PaymentModel.find(query)
            .populate("userId")
            .populate({
            path: "courseId",
            populate: {
                path: "mentorId",
            },
        })
            .lean();
        return transactions;
    }
    catch (error) {
        console.error("Error reading payments:", error);
        throw new Error("Failed to read payments");
    }
});
exports.downloadTransations = downloadTransations;
