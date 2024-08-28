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
exports.RateAndReviewRepository = void 0;
const rateAndReviewModel_1 = require("../models/rateAndReviewModel");
exports.RateAndReviewRepository = {
    createRateAndReview: (rateAndReviewData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newRateAndReview = yield rateAndReviewModel_1.RateAndReviewModal.create(rateAndReviewData);
            yield newRateAndReview.populate("courseId");
            return newRateAndReview;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    readRateAndReviewByUserId: (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const readByUserId = yield rateAndReviewModel_1.RateAndReviewModal.findOne({
                userId,
                courseId,
            });
            return readByUserId;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    readRateAndReviewByCourseId: (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const readByCourseId = yield rateAndReviewModel_1.RateAndReviewModal.find({
                courseId,
            })
                .populate("courseId")
                .sort({ createdAt: -1 });
            return readByCourseId;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
};
