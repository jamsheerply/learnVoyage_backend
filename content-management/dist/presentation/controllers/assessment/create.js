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
exports.createAssessementController = void 0;
const createAssessmentUseCase_1 = require("../../../application/useCases/assessment/createAssessmentUseCase");
const AssessmentRepository_1 = require("../../../infrastructure/database/repositories/AssessmentRepository");
const customError_1 = require("../../../_lib/common/customError");
const createExam_1 = require("../../../_lib/validation/assessement/createExam");
const createAssessementController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const examData = req.body;
        yield createExam_1.examSchema.validate(examData, { abortEarly: false });
        const createAssessment = yield (0, createAssessmentUseCase_1.createAssessmentUseCase)(AssessmentRepository_1.AssessmentRepository)(req.body);
        return res.status(200).json({ success: true, data: createAssessment });
    }
    catch (error) {
        if ((0, customError_1.isYupValidationError)(error)) {
            return res.status(400).json({ errors: error.errors });
        }
        else {
            const customError = error;
            console.error("Error creating assessment", customError);
            return res
                .status(500)
                .json({ message: customError.message || "Internal server error" });
        }
    }
});
exports.createAssessementController = createAssessementController;
