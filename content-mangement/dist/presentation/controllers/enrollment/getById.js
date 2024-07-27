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
exports.getEnrollmentByIdController = void 0;
const enrollmentRepositoryImp_1 = require("../../../infrastructure/database/repositories/enrollmentRepositoryImp");
const getEnrollmentByIdUseCase_1 = require("../../../application/useCases/enrollment/getEnrollmentByIdUseCase");
const getEnrollmentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const enrollment = yield (0, getEnrollmentByIdUseCase_1.getEnrollmentByIdUseCase)(enrollmentRepositoryImp_1.EnrollmentRepository)(id);
        if (!enrollment) {
            return res
                .status(404) // Changed status code to 404 for not found
                .json({ success: false, error: "Enrollment not found" });
        }
        return res.status(200).json({ success: true, data: enrollment });
    }
    catch (error) {
        const customError = error;
        console.error("Error fetching enrollment", error);
        return res
            .status(500)
            .json({ success: false, error: customError === null || customError === void 0 ? void 0 : customError.message });
    }
});
exports.getEnrollmentByIdController = getEnrollmentByIdController;
