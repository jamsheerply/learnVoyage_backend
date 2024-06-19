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
exports.resendOtpController = void 0;
const UserRepositoryImpl_1 = require("../../infrastructure/database/repositories/UserRepositoryImpl");
const sendOtpUseCase_1 = require("../../application/useCases/sendOtpUseCase");
const resendOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, email } = req.body;
        const sendOtp = yield (0, sendOtpUseCase_1.sendOtpUseCase)(UserRepositoryImpl_1.UserRepository)(userId, email);
        if (!sendOtp) {
            return res
                .status(500)
                .json({ sucess: false, error: "failed to resend otp !" });
        }
        return res
            .status(201)
            .json({ success: true, data: "otp send successfully" });
    }
    catch (error) { }
});
exports.resendOtpController = resendOtpController;
