"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (payload) => {
    console.log("token generatted");
    const { id, email, role, isVerified, firstName } = payload;
    const newPayload = { id, email, role, isVerified, firstName };
    return jsonwebtoken_1.default.sign(newPayload, String(process.env.ACCESS_TOKEN_PRIVATE_KEY), {
        expiresIn: "1s",
    });
};
exports.generateAccessToken = generateAccessToken;
