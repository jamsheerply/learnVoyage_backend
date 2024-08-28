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
exports.readAssessmentByCourseIdController = void 0;
const readAssessmentByCourseIdUseCase_1 = require("../../../application/useCases/assessment/readAssessmentByCourseIdUseCase");
const AssessmentRepository_1 = require("../../../infrastructure/database/repositories/AssessmentRepository");
const readAssessmentByCourseIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        const assessmentByCourseId = yield (0, readAssessmentByCourseIdUseCase_1.readAssessmentByCourseIdUseCase)(AssessmentRepository_1.AssessmentRepository)(courseId);
        if (!assessmentByCourseId) {
            return res
                .status(200)
                .json({ success: false, error: "Assessment not found" });
        }
        return res.status(200).json({ success: true, data: assessmentByCourseId });
    }
    catch (error) {
        const customError = error;
        console.log("Error fetching assessment", error);
        return res
            .status(500)
            .json({ success: false, error: customError === null || customError === void 0 ? void 0 : customError.message });
    }
});
exports.readAssessmentByCourseIdController = readAssessmentByCourseIdController;
