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
exports.signupUseCase = void 0;
const producerRpc_1 = require("../../infrastructure/messageBroker/producerRpc");
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
            const data = {
                email: newUser.email,
                message: otp,
            };
            // send-otp in user-service
            (0, producerRpc_1.sendMessage)("notification-service", { type: "sendOtp", data: data }, (response) => {
                // Specify the type of response as any or more specific type if known
                console.log("Response notification-service:", response);
                // Handle the response here
            });
            return newUser;
        }
        catch (error) {
            throw new Error(error.message || "Failed to sign up user");
        }
    });
};
exports.signupUseCase = signupUseCase;
