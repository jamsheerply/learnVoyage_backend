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
exports.sendOtpUseCase = void 0;
const producer_1 = require("../../infrastructure/messaging/producer");
const correlationId_1 = require("../../infrastructure/utility/correlationId");
const sendOtpUseCase = (UserRepository) => {
    return (userId, email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Generate and send OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            yield UserRepository.updateOtp(userId, otp);
            const correlationId = (0, correlationId_1.generateCorrelationId)();
            yield (0, producer_1.sendMessageToQueue)("notification-service-2", JSON.stringify({
                email: email,
                message: otp,
                type: "otp",
                correlationId,
            }));
            return true;
        }
        catch (error) {
            throw new Error(error.message || "Failded to resent otp");
        }
    });
};
exports.sendOtpUseCase = sendOtpUseCase;
