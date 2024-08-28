"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ResultRepository = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const resultModel_1 = require("../models/resultModel");
const enrollmentModel_1 = require("../models/enrollmentModel");
exports.ResultRepository = {
    createResult: (resultData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newResult = yield resultModel_1.ResultModel.create(resultData);
            yield newResult.populate("assessmentId");
            return newResult;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    readResultByAssessmentId: (userId, assessmentId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const readResultByAssessmentId = yield resultModel_1.ResultModel.findOne({
                userId,
                assessmentId,
            });
            yield (readResultByAssessmentId === null || readResultByAssessmentId === void 0 ? void 0 : readResultByAssessmentId.populate("assessmentId"));
            return readResultByAssessmentId;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    readResult: (queryData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, page = 1, limit = 6, search = "", filter } = queryData;
            // Create a base query
            let query = resultModel_1.ResultModel.find();
            // Add userId filter if provided
            if (userId) {
                query = query.where("userId").equals(new mongoose_1.Types.ObjectId(userId));
            }
            // Add status filter if provided
            if (filter) {
                query = query.where("status").equals(filter);
            }
            // Prepare the populate options
            const populateOptions = {
                path: "assessmentId",
                populate: {
                    path: "courseId",
                    populate: {
                        path: "categoryId",
                    },
                },
            };
            // Add search functionality
            if (search) {
                console.log("search", search);
                populateOptions.populate.match = {
                    $or: [
                        { courseName: { $regex: search, $options: "i" } },
                        { "categoryId.categoryName": { $regex: search, $options: "i" } },
                    ],
                };
            }
            // Apply the populate options
            query = query.populate(populateOptions);
            // Get total count before pagination
            const total = yield resultModel_1.ResultModel.countDocuments(query.getFilter());
            // Add pagination
            const skip = (page - 1) * limit;
            query = query.skip(skip).limit(Number(limit));
            // Execute query
            let results = (yield query.exec());
            // Filter out results where courseId is null (due to search not matching)
            results = results.filter((result) => result.assessmentId && result.assessmentId.courseId);
            return {
                total,
                page: Number(page),
                limit: Number(limit),
                results,
            };
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    readResultExamsPassRate: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userIdObject = new mongoose_1.default.Types.ObjectId(userId);
            // Count total enrollments
            const totalEnrollments = yield enrollmentModel_1.EnrollmentModel.countDocuments({ userId });
            // Aggregate results
            const resultAggregation = yield resultModel_1.ResultModel.aggregate([
                { $match: { userId: userIdObject } },
                {
                    $group: {
                        _id: null,
                        passed: {
                            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
                        },
                        failed: { $sum: { $cond: [{ $eq: ["$status", "failed"] }, 1, 0] } },
                    },
                },
            ]);
            // Extract results or set defaults if no results found
            const { passed = 0, failed = 0 } = resultAggregation[0] || {};
            // Calculate pending
            const pending = totalEnrollments - (passed + failed);
            // Calculate percentages
            const calculatePercentage = (value) => totalEnrollments > 0 ? Math.round((value / totalEnrollments) * 100) : 0;
            return {
                passed: calculatePercentage(passed),
                failed: calculatePercentage(failed),
                pending: calculatePercentage(pending),
            };
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
};
