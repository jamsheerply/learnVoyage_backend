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
exports.updateAssessmentController = void 0;
const updateAssessmentUseCase_1 = require("../../../application/useCases/assessment/updateAssessmentUseCase");
const AssessmentRepository_1 = require("../../../infrastructure/database/repositories/AssessmentRepository");
const updateAssessmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = Object.assign({ _id: id }, req.body);
        const updatedAssessment = yield (0, updateAssessmentUseCase_1.updateAssessmentUseCase)(AssessmentRepository_1.AssessmentRepository)(updateData);
        if (!updatedAssessment) {
            return res.status(404).json({
                success: false,
                error: "Assessment not found or update failed",
            });
        }
        return res.status(200).json({ success: true, data: updatedAssessment });
    }
    catch (error) {
        const customError = error;
        console.error("Error updating assessment", error);
        return res.status(500).json({
            success: false,
            error: (customError === null || customError === void 0 ? void 0 : customError.message) || "Internal server error",
        });
    }
});
exports.updateAssessmentController = updateAssessmentController;
