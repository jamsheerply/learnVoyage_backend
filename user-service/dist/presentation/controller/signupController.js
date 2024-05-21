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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = void 0;
const bcrypt_1 = require("../../infrastructure/security/bcrypt");
const signupRepository_1 = require("../../infrastructure/database/repositories/signupRepository");
const signupUseCase_1 = require("../../application/signupUseCase");
// Create an instance of the hashing service
const hashingService = new bcrypt_1.BcryptHashingService();
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, email, password } = req.body;
        const newUser = yield (0, signupUseCase_1.signupUseCase)(signupRepository_1.signupRepository, hashingService)({
            firstName,
            email,
            password,
        });
        return res.status(201).json({
            success: true,
            data: newUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: "Failed to sign up user",
        });
    }
});
exports.signupController = signupController;
