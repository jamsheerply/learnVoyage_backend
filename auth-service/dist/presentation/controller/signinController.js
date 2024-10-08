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
exports.signinController = void 0;
const generateAccessToken_1 = require("../../infrastructure/security/jwt/generateAccessToken");
const generateRefreshToken_1 = require("../../infrastructure/security/jwt/generateRefreshToken");
const UserRepositoryImpl_1 = require("../../infrastructure/database/repositories/UserRepositoryImpl");
const bcrypt_1 = __importDefault(require("../../infrastructure/security/bcrypt"));
const signinUseCase_1 = require("../../application/useCases/signinUseCase");
// Extend the Request interface to include the user property
const signinController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Call the signin use case
        const user = yield (0, signinUseCase_1.signinUseCase)(UserRepositoryImpl_1.UserRepository, bcrypt_1.default)({ email, password });
        // Check if user is found and password is correct
        if (!user) {
            return res
                .status(401)
                .json({ success: false, error: "Invalid credentials" });
        }
        // Check if the user is blocked
        if (user.isBlocked) {
            return res
                .status(401)
                .json({ success: false, error: "Please contact admin" });
        }
        // Generate access and refresh tokens
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
        // Set tokens in cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 60 * 1000,
            sameSite: "none",
            secure: true,
        }); // 14 minutes
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            sameSite: "none",
            secure: true,
        });
        // Return response with tokens
        return res.status(201).json({ success: true, data: accessToken });
    }
    catch (error) {
        // Handle any errors
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.signinController = signinController;
