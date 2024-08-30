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
exports.readPayment = void 0;
const models_1 = require("../models");
const readPayment = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, search = "", method = [], status = [], } = queryData;
        let paymentQuery = {};
        // Apply search filter
        if (search) {
            //   paymentQuery.$or = [
            //     { method: { $regex: search, $options: "i" } },
            //     { status: { $regex: search, $options: "i" } },
            //     { amount: { $regex: search, $options: "i" } },
            //   ];
        }
        // Apply method filter
        if (method.length > 0) {
            if (!(method.includes("card") && method.includes("upi"))) {
                paymentQuery.method = { $in: method };
            }
        }
        // Apply status filter
        if (status.length > 0) {
            paymentQuery.status = { $in: status };
        }
        // Count total documents that match the query
        const total = yield models_1.PaymentModel.countDocuments(paymentQuery);
        // Fetch payments with pagination
        const payments = yield models_1.PaymentModel.find(paymentQuery)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        return {
            total,
            page,
            limit,
            payments,
        };
    }
    catch (error) {
        console.error("Error reading payments:", error);
        throw new Error("Failed to read payments");
    }
});
exports.readPayment = readPayment;
