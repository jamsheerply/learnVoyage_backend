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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentRepository = void 0;
const mongoose_1 = require("mongoose");
const courseModel_1 = __importDefault(require("../models/courseModel"));
const enrollmentModel_1 = require("../models/enrollmentModel");
const resultModel_1 = require("../models/resultModel");
exports.EnrollmentRepository = {
    createEnrollment: (enrollmentData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = {
                userId: enrollmentData.userId,
                courseId: enrollmentData.courseId,
            };
            const newEnrollment = yield enrollmentModel_1.EnrollmentModel.create(data);
            yield newEnrollment.populate("courseId");
            return newEnrollment;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    updateEnrollment: (enrollmentData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id } = enrollmentData, rest = __rest(enrollmentData, ["_id"]);
            const updatedEnrollment = yield enrollmentModel_1.EnrollmentModel.findByIdAndUpdate(_id, rest, { new: true });
            return updatedEnrollment;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    readEnrollment: (queryData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, page = 1, limit = 10, search = "", category = [], instructor = [], price = [], } = queryData;
            // console.log("Query Data:", JSON.stringify(queryData));
            // Start with a base query on the Course model
            let courseQuery = {};
            if (search) {
                console.log("Search Term:", search);
                courseQuery.courseName = { $regex: search, $options: "i" };
            }
            if (category.length > 0 && category[0] !== "All") {
                console.log("Category Filter:", category);
                const categoryIds = category[0].includes(",")
                    ? category[0].split(",")
                    : category;
                courseQuery.categoryId = { $in: categoryIds };
            }
            if (instructor.length > 0) {
                console.log("Instructor Filter:", instructor);
                const instructorIds = instructor[0].includes(",")
                    ? instructor[0].split(",")
                    : instructor;
                courseQuery.mentorId = { $in: instructorIds };
            }
            if (price.length > 0 && !price.includes("All")) {
                if (price.includes("Free") && price.includes("Paid")) {
                    // Do nothing, as it includes all prices
                }
                else if (price.includes("Free")) {
                    courseQuery.coursePrice = 0;
                }
                else if (price.includes("Paid")) {
                    courseQuery.coursePrice = { $gt: 0 };
                }
            }
            // Find all course IDs that match the criteria
            const matchingCourseIds = yield courseModel_1.default.find(courseQuery).distinct("_id");
            // Now query the Enrollment model
            let enrollmentQuery = {
                userId: userId,
                courseId: { $in: matchingCourseIds },
            };
            const total = yield enrollmentModel_1.EnrollmentModel.countDocuments(enrollmentQuery);
            const enrollments = yield enrollmentModel_1.EnrollmentModel.find(enrollmentQuery)
                .populate("courseId")
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
            // console.log("Enrollments Found:", JSON.stringify(enrollments));
            // console.log("Total Enrollments:", total);
            return {
                total,
                page,
                limit,
                enrollments,
            };
        }
        catch (error) {
            console.error("Error in readEnrollment:", error);
            if (error instanceof Error) {
                throw new Error(`Failed to read enrollments: ${error.message}`);
            }
            else {
                throw new Error("An unknown error occurred while reading enrollments");
            }
        }
    }),
    getEnrollmentById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const enrollmentById = yield enrollmentModel_1.EnrollmentModel.findById(id).populate("courseId");
            return enrollmentById;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    getEnrollmentByCourseId: (courseId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const enrollmentByUserId = yield enrollmentModel_1.EnrollmentModel.findOne({
                courseId: courseId,
                userId: userId,
            });
            // if (!enrollmentByUserId) {
            //   throw new Error(
            //     "No enrollment found for the given courseId and userId"
            //   );
            // }
            return enrollmentByUserId;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    readCompleteCourse: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const enrollmentCompleteCourses = yield enrollmentModel_1.EnrollmentModel.aggregate([
                { $match: { userId } },
                {
                    $lookup: {
                        from: "courses",
                        localField: "courseId",
                        foreignField: "_id",
                        as: "courseDetails",
                    },
                },
                { $unwind: "$courseDetails" },
                {
                    $addFields: {
                        completedLessonsCount: { $size: "$progress.completedLessons" },
                        totalLessonsCount: { $size: "$courseDetails.lessons" },
                    },
                },
                {
                    $addFields: {
                        completedPercentage: {
                            $multiply: [
                                {
                                    $divide: ["$completedLessonsCount", "$totalLessonsCount"],
                                },
                                100,
                            ],
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        courseName: "$courseDetails.courseName",
                        completedPercentage: { $round: ["$completedPercentage", 2] },
                    },
                },
            ]);
            return enrollmentCompleteCourses;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    readEnrollmentActivity: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userIdObject = new mongoose_1.Types.ObjectId(userId);
            const endDate = new Date();
            const startDate = new Date(endDate);
            startDate.setDate(startDate.getDate() - (10 - 1) * 5); // 9 gaps of 5 days each
            const [enrollmentActivity, examActivity] = yield Promise.all([
                enrollmentModel_1.EnrollmentModel.aggregate([
                    {
                        $match: {
                            userId,
                            enrolledAt: { $gte: startDate, $lte: endDate },
                        },
                    },
                    {
                        $group: {
                            _id: {
                                $dateToString: { format: "%Y-%m-%d", date: "$enrolledAt" },
                            },
                            enrollment: { $sum: 1 },
                        },
                    },
                ]),
                resultModel_1.ResultModel.aggregate([
                    {
                        $match: {
                            userId: userIdObject,
                            createdAt: { $gte: startDate, $lte: endDate },
                        },
                    },
                    {
                        $group: {
                            _id: {
                                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                            },
                            exam: { $sum: 1 },
                        },
                    },
                ]),
            ]);
            const combinedActivity = {};
            // Generate all 10 dates with 5-day gaps
            for (let i = 0; i < 10; i++) {
                const currentDate = new Date(endDate);
                currentDate.setDate(currentDate.getDate() - i * 5);
                const dateString = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD format
                combinedActivity[dateString] = {
                    date: dateString,
                    enrollment: 0,
                    exam: 0,
                };
            }
            // Ensure dates are correctly matched and counted
            enrollmentActivity.forEach((item) => {
                const date = item._id;
                if (combinedActivity[date]) {
                    combinedActivity[date].enrollment = item.enrollment;
                }
            });
            examActivity.forEach((item) => {
                const date = item._id;
                if (combinedActivity[date]) {
                    combinedActivity[date].exam = item.exam;
                }
            });
            // Convert to array and sort by date (most recent first)
            const result = Object.values(combinedActivity).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            console.log("Result:", result);
            console.log("enrollmentActivity", enrollmentActivity);
            console.log("examActivity", examActivity);
            return null;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    readRecentEnrollment: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const recentEnrollment = yield enrollmentModel_1.EnrollmentModel.aggregate([
                {
                    $match: {
                        userId: userId,
                    },
                },
                {
                    $sort: {
                        enrolledAt: -1,
                    },
                },
                {
                    $limit: 4,
                },
                {
                    $lookup: {
                        from: "courses",
                        localField: "courseId",
                        foreignField: "_id",
                        as: "course",
                    },
                },
                {
                    $unwind: "$course",
                },
                {
                    $project: {
                        _id: 1,
                        userId: 1,
                        courseId: 1,
                        enrolledAt: 1,
                        progress: 1,
                        course: {
                            _id: 1,
                            mentorId: 1,
                            courseName: 1,
                            categoryId: 1,
                            description: 1,
                            language: 1,
                            coursePrice: 1,
                            courseThumbnailUrl: 1,
                            courseDemoVideo: 1,
                            id: 1,
                            isBlocked: 1,
                            reason: 1,
                            lessons: 1,
                            createdAt: 1,
                            updatedAt: 1,
                        },
                    },
                },
            ]);
            return recentEnrollment;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    readTopCourses: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const topCourses = yield enrollmentModel_1.EnrollmentModel.aggregate([
                {
                    $group: {
                        _id: "$courseId",
                        totalEnrollments: { $sum: 1 },
                    },
                },
                {
                    $sort: { totalEnrollments: -1 },
                },
                {
                    $lookup: {
                        from: "courses",
                        localField: "_id",
                        foreignField: "_id",
                        as: "courseDetails",
                    },
                },
                {
                    $unwind: "$courseDetails",
                },
                {
                    $project: {
                        courseId: "$_id",
                        totalEnrollments: 1,
                        courseName: "$courseDetails.courseName",
                        mentorId: "$courseDetails.mentorId",
                        lessons: "$courseDetails.lessons",
                        courseThumbnailUrl: "$courseDetails.courseThumbnailUrl",
                    },
                },
            ]);
            return topCourses;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    readCourseStatus: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const CourseStatus = yield enrollmentModel_1.EnrollmentModel.aggregate([
                {
                    $group: {
                        _id: "$courseId",
                        totalEnrollments: { $sum: 1 },
                    },
                },
                {
                    $sort: { totalEnrollments: -1 },
                },
                {
                    $lookup: {
                        from: "courses",
                        localField: "_id",
                        foreignField: "_id",
                        as: "courseDetails",
                    },
                },
                {
                    $unwind: "$courseDetails",
                },
                {
                    $lookup: {
                        from: "categories",
                        let: { categoryId: { $toObjectId: "$courseDetails.categoryId" } },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$categoryId"] } } },
                        ],
                        as: "categoryDetails",
                    },
                },
                {
                    $unwind: "$categoryDetails",
                },
                {
                    $project: {
                        courseId: "$_id",
                        totalEnrollments: 1,
                        courseName: "$courseDetails.courseName",
                        mentorId: "$courseDetails.mentorId",
                        lessons: "$courseDetails.lessons",
                        courseThumbnailUrl: "$courseDetails.courseThumbnailUrl",
                        categoryId: "$courseDetails.categoryId",
                        categoryName: "$categoryDetails.categoryName",
                        coursePrice: "$courseDetails.coursePrice",
                        totalRevenue: {
                            $multiply: ["$totalEnrollments", "$courseDetails.coursePrice"],
                        },
                    },
                },
            ]);
            return CourseStatus;
        }
        catch (error) {
            const customError = error;
            console.log("courseStatus", customError.message);
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
};
