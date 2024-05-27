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
exports.signinContoller = void 0;
const jwt_1 = __importDefault(require("../../infrastructure/security/jwt"));
const signinUseCase_1 = require("../../application/useCases/signinUseCase");
const UserRepository_1 = require("../../infrastructure/database/repositories/UserRepository");
const bcrypt_1 = __importDefault(require("../../infrastructure/security/bcrypt"));
const signinContoller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, signinUseCase_1.signinUseCase)(UserRepository_1.UserRepository, bcrypt_1.default)({
            email,
            password,
        });
        if (!user) {
            return res
                .status(500)
                .json({ success: false, error: "Failed to signin user" });
        }
        //Generate JWT token
        const tokenService = (0, jwt_1.default)(process.env.JWT_SECRET);
        const token = tokenService.generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        return res.status(201).json({ success: true, data: user });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, error: "Failed to sign up user" });
    }
});
exports.signinContoller = signinContoller;
