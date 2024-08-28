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
exports.readPaymentTotalRevene = void 0;
const models_1 = require("../models");
const readPaymentTotalRevene = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield models_1.PaymentModel.aggregate([
            {
                $match: {
                    status: "completed",
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" },
                },
            },
        ]);
        if (!totalRevenue || totalRevenue.length === 0) {
            throw new Error("No completed payments found");
        }
        return { totalRevenue: totalRevenue[0].total };
    }
    catch (error) {
        const customError = error;
        console.log("readPaymentTotalRevene", customError.message);
        throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
    }
});
exports.readPaymentTotalRevene = readPaymentTotalRevene;
