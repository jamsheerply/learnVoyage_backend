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
exports.createRateAndReviewController = void 0;
const createRateAndReview_1 = __importDefault(require("../../../_lib/validation/rateAndReview/createRateAndReview"));
const createRateAndReviewUseCase_1 = require("../../../application/useCases/rateAndReview/createRateAndReviewUseCase");
const rateAndReviewRepositoryImp_1 = require("../../../infrastructure/database/repositories/rateAndReviewRepositoryImp");
const createRateAndReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the request body
        const { error, value } = createRateAndReview_1.default.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            return res.status(400).json({ success: false, errors: errorMessages });
        }
        // Create the rate and review using the validated data
        const createRateAndReview = yield (0, createRateAndReviewUseCase_1.createRateAndReviewUseCase)(rateAndReviewRepositoryImp_1.RateAndReviewRepository)(value);
        return res.status(201).json({ success: true, data: createRateAndReview });
    }
    catch (error) {
        const customError = error;
        console.error("Error creating rateAndreview", customError);
        return res.status(customError.statusCode || 500).json({
            success: false,
            message: customError.message || "Internal server error",
        });
    }
});
exports.createRateAndReviewController = createRateAndReviewController;
