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
exports.readRateAndReviewCourseIdController = void 0;
const readRateAndReviewByCourseIdUseCase_1 = require("../../../application/useCases/rateAndReview/readRateAndReviewByCourseIdUseCase");
const rateAndReviewRepositoryImp_1 = require("../../../infrastructure/database/repositories/rateAndReviewRepositoryImp");
const readRateAndReviewCourseIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        const resultByCourseId = yield (0, readRateAndReviewByCourseIdUseCase_1.readRateAndReviewCourseIdUseCase)(rateAndReviewRepositoryImp_1.RateAndReviewRepository)(courseId);
        return res.status(200).json({ success: true, data: resultByCourseId });
    }
    catch (error) {
        const customError = error;
        console.error("Error fetching rate and review bycourseId:", customError);
        return res.status(customError.statusCode || 500).json({
            success: false,
            error: customError.message || "Internal server error",
        });
    }
});
exports.readRateAndReviewCourseIdController = readRateAndReviewCourseIdController;
