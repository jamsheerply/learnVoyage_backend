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
exports.signinController = void 0;
const signinUseCase_1 = require("../../application/useCases/signinUseCase");
const UserRepositoryImpl_1 = require("../../infrastructure/database/repositories/UserRepositoryImpl");
const bcrypt_1 = __importDefault(require("../../infrastructure/security/bcrypt"));
const jwt_1 = require("../../infrastructure/security/jwt");
const signinController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, signinUseCase_1.signinUseCase)(UserRepositoryImpl_1.UserRepository, bcrypt_1.default)({ email, password });
        if (!user) {
            return res
                .status(401)
                .json({ success: false, error: "Invalid credentials" });
        }
        if (user.isBlocked) {
            return res
                .status(401)
                .json({ success: false, error: "Please contact admin" });
        }
        const tokenService = (0, jwt_1.generateJwtTokenService)(process.env.JWT_SECRET);
        const token = tokenService.generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
        });
        return res.status(200).json({ success: true, data: token });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.signinController = signinController;
