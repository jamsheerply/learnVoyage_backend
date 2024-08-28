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
exports.signinUseCase = void 0;
const producerRpc_1 = require("../../infrastructure/messageBroker/producerRpc");
const signinUseCase = (userRepository, hashingService) => {
    return (userData) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userRepository.getUserByEmail(userData.email);
        if (!user) {
            throw new Error("User not found");
        }
        if (!(user === null || user === void 0 ? void 0 : user.isVerified)) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            yield userRepository.updateOtp(user.id, otp);
            const data = {
                email: user.email,
                message: otp,
            };
            // send-otp in user-service
            (0, producerRpc_1.sendMessage)("notification-service", { type: "sendOtp", data: data }, (response) => {
                // Specify the type of response as any or more specific type if known
                console.log("Response notification-service:", response);
                // Handle the response here
            });
        }
        const isPasswordValid = yield hashingService.compare(userData.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid user credential");
        }
        return user;
    });
};
exports.signinUseCase = signinUseCase;
