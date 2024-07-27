"use strict";
// import jwt from "jsonwebtoken";
// import { IUser } from "../../../domain/entities/user.entity";
// import { ITokenRepository } from "../../../domain/interfaces/repositories/ITokenRepositroy";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = void 0;
// // Function to generate refresh tokens, accepts refresh token private key as an argument
// const generateRefreshTokenService = (REFRESH_TOKEN_PRIVATE_KEY: string) => {
//   return {
//     // Method to generate a refresh token
//     generateToken: async (user: IUser) => {
//       const payload = {
//         id: user.id,
//         email: user.email,
//         role: user.role,
//         isVerified: user.isVerified,
//       };
//       const generatedRefreshToken = jwt.sign(
//         payload,
//         REFRESH_TOKEN_PRIVATE_KEY,
//         {
//           expiresIn: "30d",
//         }
//       );
//       return generatedRefreshToken;
//     },
//   };
// };
// export { generateRefreshTokenService };
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateRefreshToken = (payload) => {
    const { id, email, role, isVerified, firstName } = payload;
    const newPayload = { id, email, role, isVerified, firstName };
    return jsonwebtoken_1.default.sign(newPayload, String(process.env.REFRESH_TOKEN_PRIVATE_KEY), {
        expiresIn: "30d",
    });
};
exports.generateRefreshToken = generateRefreshToken;
