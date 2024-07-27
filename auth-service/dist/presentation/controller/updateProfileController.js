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
exports.updateProfileController = void 0;
const updateProfileUseCase_1 = require("../../application/useCases/updateProfileUseCase");
const UserRepositoryImpl_1 = require("../../infrastructure/database/repositories/UserRepositoryImpl");
const bcrypt_1 = __importDefault(require("../../infrastructure/security/bcrypt"));
const updateProfileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        // Hash password if it is provided
        if (userData.password) {
            const hashedPassword = yield bcrypt_1.default.hash(userData.password);
            userData.password = hashedPassword;
            console.log(userData.password);
        }
        const updatedProfile = yield (0, updateProfileUseCase_1.updateProfileUseCase)(UserRepositoryImpl_1.UserRepository)(userData);
        return res.status(200).json({ success: true, data: updatedProfile });
    }
    catch (error) {
        next(error);
    }
});
exports.updateProfileController = updateProfileController;
