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
exports.getAllInstructorsController = void 0;
const UserRepositoryImpl_1 = require("../../infrastructure/database/repositories/UserRepositoryImpl");
const getAllInstructorUseCase_1 = require("../../application/useCases/getAllInstructorUseCase");
const getAllInstructorsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchInstructors = (0, getAllInstructorUseCase_1.getAllInstructorUseCase)(UserRepositoryImpl_1.UserRepository);
        const instructors = yield fetchInstructors();
        res.status(200).json({ success: true, data: instructors });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "An error occurred while fetching instructors." });
    }
});
exports.getAllInstructorsController = getAllInstructorsController;
