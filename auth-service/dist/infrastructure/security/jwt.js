"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/utility/generateJwtTokenService.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateJwtTokenService = (secretKey) => {
    const generateToken = (user) => {
        const userId = user._id.toHexString();
        return jsonwebtoken_1.default.sign({ userId, name: user.firstName, email: user.email }, secretKey, { expiresIn: "1h" });
    };
    return {
        generateToken,
    };
};
exports.default = generateJwtTokenService;
