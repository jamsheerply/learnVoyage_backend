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
exports.AssessmentRepository = void 0;
const assessmentModel_1 = require("../models/assessmentModel");
const courseModel_1 = __importDefault(require("../models/courseModel"));
exports.AssessmentRepository = {
    createAssessment: (createData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newAssessment = yield assessmentModel_1.AssessmentModel.create(createData);
            yield newAssessment.populate("courseId");
            return newAssessment;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    readAssessment: (queryData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, page = 1, limit = 6, search = "" } = queryData;
            let courseQuery = {};
            if (search) {
                console.log("Search Term:", search);
                courseQuery.courseName = { $regex: `^${search}`, $options: "i" };
            }
            const matchingCourseIds = yield courseModel_1.default.find(courseQuery).distinct("_id");
            // Now query the Enrollment model
            let assessmentQuery;
            if (userId) {
                assessmentQuery = {
                    instructorId: userId,
                    courseId: { $in: matchingCourseIds },
                };
            }
            else {
                assessmentQuery = {
                    courseId: { $in: matchingCourseIds },
                };
            }
            const total = yield assessmentModel_1.AssessmentModel.countDocuments(assessmentQuery);
            const assessments = yield assessmentModel_1.AssessmentModel.find(assessmentQuery)
                .populate("courseId")
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
            return {
                total,
                page,
                limit,
                assessments,
            };
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    readAssessmentById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const assessmentById = yield assessmentModel_1.AssessmentModel.findById(id).populate("courseId");
            console.log("assessmentById", assessmentById);
            return assessmentById;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    updateAssessment: (assesment) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updateAssessment = yield assessmentModel_1.AssessmentModel.findByIdAndUpdate(assesment._id, assesment, { new: true });
            if (!updateAssessment) {
                throw new Error("assessment not found");
            }
            return updateAssessment;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    readAssessmentByCourseId: (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const assessmentByCourseId = yield assessmentModel_1.AssessmentModel.findOne({
                courseId,
            }).populate("courseId");
            return assessmentByCourseId;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
};
