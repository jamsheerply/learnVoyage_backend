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
exports.readResultByAssessmentIdController = void 0;
const ResultRepositoryImp_1 = require("../../../infrastructure/database/repositories/ResultRepositoryImp");
const readResultByAssessmentIdUseCase_1 = require("../../../application/useCases/result/readResultByAssessmentIdUseCase");
const readResultByAssessmentIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { assessmentId } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const resultByAssessmentId = yield (0, readResultByAssessmentIdUseCase_1.readResultByAssessmentIdUseCase)(ResultRepositoryImp_1.ResultRepository)(userId, assessmentId);
        if (!resultByAssessmentId) {
            return res
                .status(200)
                .json({ success: false, error: "Result not found" });
        }
        return res.status(200).json({ success: true, data: resultByAssessmentId });
    }
    catch (error) {
        const customError = error;
        console.log("Error fetching result", error);
        return res
            .status(500)
            .json({ success: false, error: customError === null || customError === void 0 ? void 0 : customError.message });
    }
});
exports.readResultByAssessmentIdController = readResultByAssessmentIdController;
