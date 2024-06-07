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
const jwt_1 = require("../../infrastructure/security/jwt");
const UserRepositoryImpl_1 = require("../../infrastructure/database/repositories/UserRepositoryImpl");
const bcrypt_1 = __importDefault(require("../../infrastructure/security/bcrypt"));
const signupUseCase_1 = require("../../application/useCases/signupUseCase");
const verifyOtpUseCase_1 = require("../../application/useCases/verifyOtpUseCase");
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        console.log(req.body);
        // Create a new user object that matches the IUser interface
        const newUser = {
            id: "",
            firstName,
            lastName,
            email,
            password,
            role,
            profile: {
                avatar: "",
                dob: "",
                gender: "other",
            },
            contact: {
                additionalEmail: "",
                phone: "",
                socialMedia: {
                    instagram: "",
                    linkedIn: "",
                    github: "",
                },
            },
            isBlocked: false,
            isVerified: false,
            profession: "",
            otp: "",
            profit: 0,
        };
        const createdUser = yield (0, signupUseCase_1.signupUseCase)(UserRepositoryImpl_1.UserRepository, bcrypt_1.default)(newUser);
        if (!createdUser) {
            return res
                .status(500)
                .json({ success: false, error: "Failed to sign up user !" });
        }
        // Generate JWT token
        const tokenService = (0, jwt_1.generateJwtTokenService)(process.env.JWT_SECRET);
        const token = tokenService.generateToken(createdUser);
        console.log(token);
        // Set token in cookies
        res.cookie("token", token, {
            httpOnly: true,
        });
        return res.status(201).json({ success: true, data: token });
    }
    catch (error) {
        if (error.message === "Email already exists") {
            return res
                .status(400)
                .json({ success: false, error: "Email already exists" });
        }
        return res
            .status(500)
            .json({ success: false, error: "Failed to sign up user catch" });
    }
});
exports.signupController = signupController;
const verifyOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, otp } = req.body;
        console.log(req.body);
        const isVerified = yield (0, verifyOtpUseCase_1.verifyOtpUseCase)(UserRepositoryImpl_1.UserRepository)(userId, otp);
        if (!isVerified) {
            return res.status(400).json({ success: false, error: "Invalid OTP" });
        }
        const user = yield UserRepositoryImpl_1.UserRepository.getUserById(userId);
        if (!user) {
            return res.status(500).json({ success: false, error: "User not found" });
        }
        const tokenService = (0, jwt_1.generateJwtTokenService)(process.env.JWT_SECRET);
        const token = tokenService.generateToken(user);
        console.log(token);
        return res.status(200).json({ success: true, data: token });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, error: "Failed to verify OTP" });
    }
});
exports.verifyOtpController = verifyOtpController;
