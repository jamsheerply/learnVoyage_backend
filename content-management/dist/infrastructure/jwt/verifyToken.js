"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.jwtMiddleware = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const generateAccessToken_1 = require("./generateAccessToken");
const verifyToken = (token, secret) => {
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.TokenExpiredError || err instanceof jsonwebtoken_1.JsonWebTokenError) {
            console.error(`Error verifying token: ${err.message}`);
            return null;
        }
        throw err;
    }
};
const jwtMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accessToken, refreshToken } = req.cookies;
        let user = null;
        if (accessToken) {
            user = verifyToken(accessToken, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        }
        if (!user && refreshToken) {
            user = verifyToken(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
            if (user) {
                const newAccessToken = (0, generateAccessToken_1.generateAccessToken)({
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    isVerified: user.isVerified,
                    firstName: user.firstName,
                });
                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    maxAge: 60 * 1000,
                    sameSite: "none",
                    secure: true,
                });
            }
        }
        if (!user) {
            return res
                .status(401)
                .json({ message: "Unauthorized, please log in again." });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Error in JWT middleware:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});
exports.jwtMiddleware = jwtMiddleware;
