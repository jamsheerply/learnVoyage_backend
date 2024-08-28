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
exports.readAssessementController = void 0;
const readAssessmentUseCase_1 = require("../../../application/useCases/assessment/readAssessmentUseCase");
const AssessmentRepository_1 = require("../../../infrastructure/database/repositories/AssessmentRepository");
const readAssessementController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { page, limit, search } = req.query;
        // Convert query parameters to the expected types
        const queryData = {
            userId: ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "admin" ? (_b = req.user) === null || _b === void 0 ? void 0 : _b.id : "",
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10) || 10,
            search: search || undefined,
        };
        const readAssessment = yield (0, readAssessmentUseCase_1.readAssessmentUseCase)(AssessmentRepository_1.AssessmentRepository)(queryData);
        return res.status(200).json({ success: true, data: readAssessment });
    }
    catch (error) {
        const customError = error;
        console.error("Error creating assessment", error);
        return res
            .status(500)
            .json({ success: false, error: customError === null || customError === void 0 ? void 0 : customError.message });
    }
});
exports.readAssessementController = readAssessementController;
