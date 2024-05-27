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
exports.signupUseCase = void 0;
const signupUseCase = (userRepository, hashingService) => {
    return (userData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashedPassword = yield hashingService.hash(userData.password);
            const newUser = yield userRepository.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
            if (!newUser) {
                throw new Error("Failed to create user");
            }
            return newUser;
        }
        catch (error) {
            throw new Error("Failed to sign up user");
        }
    });
};
exports.signupUseCase = signupUseCase;
