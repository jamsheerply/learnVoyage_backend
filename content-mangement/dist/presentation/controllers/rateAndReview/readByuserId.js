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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readRateAndReviewUserIdController = void 0;
const readRateAndReviewUserIdUseCase_1 = require("../../../application/useCases/rateAndReview/readRateAndReviewUserIdUseCase");
const rateAndReviewRepositoryImp_1 = require("../../../infrastructure/database/repositories/rateAndReviewRepositoryImp");
const readByCourseId_1 = __importDefault(require("../../../_lib/validation/rateAndReview/readByCourseId"));
const readRateAndReviewUserIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { courseId } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res
                .status(401)
                .json({ success: false, error: "User not authenticated" });
        }
        const { error, value } = readByCourseId_1.default.validate({ userId, courseId }, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            return res.status(400).json({ success: false, errors: errorMessages });
        }
        const resultByCourseId = yield (0, readRateAndReviewUserIdUseCase_1.readRateAndReviewUserIdUseCase)(rateAndReviewRepositoryImp_1.RateAndReviewRepository)(value.userId, value.courseId);
        if (!resultByCourseId) {
            return res
                .status(200)
                .json({ success: false, error: "Rate and review not found" });
        }
        return res.status(200).json({ success: true, data: resultByCourseId });
    }
    catch (error) {
        const customError = error;
        console.error("Error fetching rate and review:", customError);
        return res.status(customError.statusCode || 500).json({
            success: false,
            error: customError.message || "Internal server error",
        });
    }
});
exports.readRateAndReviewUserIdController = readRateAndReviewUserIdController;
