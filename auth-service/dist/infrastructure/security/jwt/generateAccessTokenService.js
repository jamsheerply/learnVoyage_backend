"use strict";
// import jwt from "jsonwebtoken";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
// // Define the User interface
// export interface User {
//   id: string;
//   email: string;
//   role: string;
//   isVerified: boolean;
//   firstName: string;
// }
// // Function to generate access tokens, accepts access token private key as an argument
// const generateAccessTokenService = (ACCESS_TOKEN_PRIVATE_KEY: string) => {
//   return {
//     // Method to generate an access token
//     generateToken: (user: User) => {
//       const payload = {
//         id: user.id,
//         email: user.email,
//         role: user.role,
//         isVerified: user.isVerified,
//         firstName: user.firstName,
//       };
//       return jwt.sign(payload, ACCESS_TOKEN_PRIVATE_KEY, {
//         expiresIn: "30d",
//       });
//     },
//   };
// };
// export { generateAccessTokenService };
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (payload) => {
    const { id, email, role, isVerified, firstName } = payload;
    const newPayload = { id, email, role, isVerified, firstName };
    return jsonwebtoken_1.default.sign(newPayload, String(process.env.ACCESS_TOKEN_PRIVATE_KEY), {
        expiresIn: "30s",
    });
};
exports.generateAccessToken = generateAccessToken;
