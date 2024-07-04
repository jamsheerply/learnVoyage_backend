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
const verifyAccessTokenService_1 = require("../../infrastructure/security/jwt/verifyAccessTokenService");
const verifyRefreshTokenService_1 = require("../../infrastructure/security/jwt/verifyRefreshTokenService");
const generateAccessTokenService_1 = require("../../infrastructure/security/jwt/generateAccessTokenService");
const authMiddleware = (ACCESS_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_PRIVATE_KEY) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res
                    .status(401)
                    .json({ success: false, message: "No refresh token" });
            }
            else {
                try {
                    const verifiedRefreshToken = yield (0, verifyRefreshTokenService_1.verifyRefreshToken)(REFRESH_TOKEN_PRIVATE_KEY)(refreshToken);
                    if (!verifiedRefreshToken ||
                        typeof verifiedRefreshToken === "string") {
                        throw new Error("Invalid user credential");
                    }
                    const accessTokenService = (0, generateAccessTokenService_1.generateAccessTokenService)(ACCESS_TOKEN_PRIVATE_KEY);
                    const user = verifiedRefreshToken;
                    const newAccessToken = accessTokenService.generateToken(user);
                    res.cookie("accessToken", newAccessToken, {
                        httpOnly: true,
                        maxAge: 14 * 60 * 1000,
                    });
                    next();
                }
                catch (error) {
                    return res.status(401).json({
                        success: false,
                        message: "Refresh token verification failed",
                    });
                }
            }
        }
        else {
            try {
                const verifiedAccessToken = (0, verifyAccessTokenService_1.verifyAccessToken)(ACCESS_TOKEN_PRIVATE_KEY)(accessToken);
                req.user = verifiedAccessToken; // Attach user info to request object
                next();
            }
            catch (error) {
                return res.status(401).json({
                    success: false,
                    message: "Access token verification failed",
                });
            }
        }
    });
};
exports.default = authMiddleware;
