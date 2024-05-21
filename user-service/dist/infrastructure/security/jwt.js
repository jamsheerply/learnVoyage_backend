"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtTokenService {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    generateToken(user) {
        return jsonwebtoken_1.default.sign({ userId: user.id }, this.secretKey);
    }
}
exports.JwtTokenService = JwtTokenService;
