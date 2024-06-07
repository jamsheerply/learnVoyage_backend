"use strict";
// import { IUser } from "../../domain/entities/user.entity";
// import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
// import { IHashingService } from "../../domain/interfaces/services/IHashingService";
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
exports.signupUseCase = void 0;
const producer_1 = require("../../infrastructure/messaging/producer");
const correlationId_1 = require("../../infrastructure/utility/correlationId");
const signupUseCase = (userRepository, hashingService) => {
    return (userData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Check if email already exists
            const existingUser = yield userRepository.getUserByEmail(userData.email);
            if (existingUser) {
                throw new Error("Email already exists");
            }
            const hashedPassword = yield hashingService.hash(userData.password);
            // Generate and send OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const newUser = yield userRepository.addUser(Object.assign(Object.assign({}, userData), { password: hashedPassword, isVerified: false, otp }));
            yield userRepository.updateOtp(newUser.id, otp);
            const correlationId = (0, correlationId_1.generateCorrelationId)();
            yield (0, producer_1.sendMessageToQueue)("notification-service", JSON.stringify({
                email: newUser.email,
                message: otp,
                type: "otp",
                correlationId,
            }));
            return newUser;
        }
        catch (error) {
            throw new Error(error.message || "Failed to sign up user");
        }
    });
};
exports.signupUseCase = signupUseCase;
