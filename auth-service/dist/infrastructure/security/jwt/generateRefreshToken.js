"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateRefreshToken = (payload) => {
    const { id, email, role, isVerified, firstName } = payload;
    const newPayload = { id, email, role, isVerified, firstName };
    return jsonwebtoken_1.default.sign(newPayload, String(process.env.REFRESH_TOKEN_PRIVATE_KEY), {
        expiresIn: "30d",
    });
};
exports.generateRefreshToken = generateRefreshToken;
