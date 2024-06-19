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
exports.isBlockedController = void 0;
const UserRepositoryImpl_1 = require("../../infrastructure/database/repositories/UserRepositoryImpl");
const isBlockedUseCase_1 = require("../../application/useCases/isBlockedUseCase");
const isBlockedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const isBlocked = yield (0, isBlockedUseCase_1.isBlockedUseCase)(UserRepositoryImpl_1.UserRepository)(id);
        return res.status(200).json({ success: true, data: isBlocked });
    }
    catch (error) {
        if (error.message === "User not found") {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.isBlockedController = isBlockedController;
