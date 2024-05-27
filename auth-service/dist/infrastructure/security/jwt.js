"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/utility/generateJwtTokenService.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwtTokenService = (secretKey) => {
    const generateToken = (user) => {
        return jsonwebtoken_1.default.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
    };
    return {
        generateToken,
    };
};
exports.default = generateJwtTokenService;
