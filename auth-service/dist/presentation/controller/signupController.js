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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpController = exports.signupController = void 0;
const generateAccessToken_1 = require("../../infrastructure/security/jwt/generateAccessToken");
const generateRefreshToken_1 = require("../../infrastructure/security/jwt/generateRefreshToken");
const UserRepositoryImpl_1 = require("../../infrastructure/database/repositories/UserRepositoryImpl");
const bcrypt_1 = __importDefault(require("../../infrastructure/security/bcrypt"));
const signupUseCase_1 = require("../../application/useCases/signupUseCase");
const verifyOtpUseCase_1 = require("../../application/useCases/verifyOtpUseCase");
const producerRpc_1 = require("../../infrastructure/messaging/producerRpc");
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, role } = req.body;
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
                .json({ success: false, error: "Failed to sign up user!" });
        }
        const accessToken = (0, generateAccessToken_1.generateAccessToken)(createdUser);
        const refreshToken = (0, generateRefreshToken_1.generateRefreshToken)(createdUser);
        console.log(accessToken);
        console.log(refreshToken);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 14 * 60 * 1000,
            sameSite: "strict",
            secure: true,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: true,
        });
        return res.status(201).json({ success: true, data: accessToken });
    }
    catch (error) {
        if (error.message === "Email already exists") {
            return res
                .status(400)
                .json({ success: false, error: "Email already exists" });
        }
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
        // const accessTokenService = generateAccessTokenService(
        //   process.env.ACCESS_TOKEN_PRIVATE_KEY!
        // );
        // const refreshTokenService = generateRefreshTokenService(
        //   process.env.REFRESH_TOKEN_PRIVATE_KEY!
        // );
        // const accessToken = accessTokenService.generateToken(user);
        // const refreshtoken = await refreshTokenService.generateToken(user);
        const accessToken = (0, generateAccessToken_1.generateAccessToken)(user);
        const refreshToken = (0, generateRefreshToken_1.generateRefreshToken)(user);
        console.log(accessToken);
        console.log(refreshToken);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 14 * 60 * 1000,
            sameSite: "strict",
            secure: true,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: true,
        });
        // create-user in chat
        (0, producerRpc_1.sendMessage)("chat-service", { type: "createUser", data: user }, (response) => {
            // Specify the type of response as any or more specific type if known
            console.log("Response from content-management-service:", response);
            // Handle the response here
        });
        return res.status(200).json({ success: true, data: accessToken });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, error: "Failed to verify OTP" });
    }
});
exports.verifyOtpController = verifyOtpController;
