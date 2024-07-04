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
exports.editInstructorController = void 0;
const UserRepositoryImpl_1 = require("../../infrastructure/database/repositories/UserRepositoryImpl");
const editInstructorUseCase_1 = require("../../application/useCases/editInstructorUseCase");
const editInstructorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, isBlocked } = req.body;
        if (!id || typeof isBlocked !== "boolean") {
            return res
                .status(400)
                .json({ success: false, message: "Invalid input data" });
        }
        const patchInstructors = (0, editInstructorUseCase_1.editInstructorUseCase)(UserRepositoryImpl_1.UserRepository);
        const instructor = yield patchInstructors(id, isBlocked);
        res.status(200).json({ success: true, data: instructor });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.editInstructorController = editInstructorController;
