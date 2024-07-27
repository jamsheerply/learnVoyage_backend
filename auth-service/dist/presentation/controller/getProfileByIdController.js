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
exports.getProfileByIdController = void 0;
const getProfileByIdUseCase_1 = require("../../application/useCases/getProfileByIdUseCase");
const UserRepositoryImpl_1 = require("../../infrastructure/database/repositories/UserRepositoryImpl");
const getProfileByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getProfileById = yield (0, getProfileByIdUseCase_1.getProfileByIdUseCase)(UserRepositoryImpl_1.UserRepository)(id);
        return res.status(201).json({ success: true, data: getProfileById });
    }
    catch (error) {
        next(error);
    }
});
exports.getProfileByIdController = getProfileByIdController;
