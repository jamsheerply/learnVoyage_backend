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
exports.getEnrollmentByCourseIdController = void 0;
const enrollmentRepositoryImp_1 = require("../../../infrastructure/database/repositories/enrollmentRepositoryImp");
const getEnrollemntCourseIdUseCase_1 = require("../../../application/useCases/enrollment/getEnrollemntCourseIdUseCase");
const getEnrollmentByCourseIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { courseId } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const enrollmentByCourseId = yield (0, getEnrollemntCourseIdUseCase_1.getEnrollmentCourseIdUseCase)(enrollmentRepositoryImp_1.EnrollmentRepository)(courseId, userId);
        if (!enrollmentByCourseId) {
            return res
                .status(404) // Changed status code to 404 for not found
                .json({ success: false, error: "Enrollment not found" });
        }
        return res.status(200).json({ success: true, data: enrollmentByCourseId });
    }
    catch (error) {
        const customError = error;
        console.error("Error fetching enrollment", error);
        return res
            .status(500)
            .json({ success: false, error: customError === null || customError === void 0 ? void 0 : customError.message });
    }
});
exports.getEnrollmentByCourseIdController = getEnrollmentByCourseIdController;
