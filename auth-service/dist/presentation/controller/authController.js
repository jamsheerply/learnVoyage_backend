"use strict";
// import { Request, Response } from "express";
// import generateJwtTokenService from "../../infrastructure/security/jwt";
// import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
// import BcryptHashingService from "../../infrastructure/security/bcrypt";
// import { signupUseCase } from "../../application/useCases/signupUseCase";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpController = exports.signupController = void 0;
const jwt_1 = __importDefault(require("../../infrastructure/security/jwt"));
const UserRepositoryImpl_1 = require("../../infrastructure/database/repositories/UserRepositoryImpl");
const bcrypt_1 = __importDefault(require("../../infrastructure/security/bcrypt"));
const signupUseCase_1 = require("../../application/useCases/signupUseCase");
const verifyOtpUseCase_1 = require("../../application/useCases/verifyOtpUseCase");
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        const newUser = yield (0, signupUseCase_1.signupUseCase)(UserRepositoryImpl_1.UserRepository, bcrypt_1.default)({
            firstName,
            lastName,
            email,
            password,
        });
        if (!newUser) {
            return res
                .status(500)
                .json({ success: false, error: "Failed to sign up user" });
        }
        return res.status(201).json({ success: true, message: "OTP sent" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, error: "Failed to sign up user" });
    }
});
exports.signupController = signupController;
const verifyOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, otp } = req.body;
        const isVerified = yield (0, verifyOtpUseCase_1.verifyOtpUseCase)(UserRepositoryImpl_1.UserRepository)(userId, otp);
        if (!isVerified) {
            return res.status(400).json({ success: false, error: "Invalid OTP" });
        }
        const user = yield UserRepositoryImpl_1.UserRepository.getUserById(userId);
        if (!user) {
            return res.status(500).json({ success: false, error: "User not found" });
        }
        const tokenService = (0, jwt_1.default)(process.env.JWT_SECRET);
        const token = tokenService.generateToken(user);
        return res.status(200).json({ success: true, data: token });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, error: "Failed to verify OTP" });
    }
});
exports.verifyOtpController = verifyOtpController;
