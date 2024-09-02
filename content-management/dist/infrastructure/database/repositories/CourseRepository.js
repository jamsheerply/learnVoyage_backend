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
exports.CourseRepository = void 0;
const courseModel_1 = __importDefault(require("../models/courseModel"));
exports.CourseRepository = {
    createCourse: (course) => __awaiter(void 0, void 0, void 0, function* () {
        const newCourse = new courseModel_1.default(course);
        yield newCourse.save();
        const courseObject = newCourse.toObject();
        courseObject.id = courseObject._id.toString();
        return courseObject;
    }),
    readAllCourses: (queryData) => __awaiter(void 0, void 0, void 0, function* () {
        const { page = 1, limit = 5, search = "", category = [], instructor = [], price = [], } = queryData;
        // console.log(JSON.stringify(queryData));
        let query = courseModel_1.default.find();
        // Unified Filter
        if (search) {
            query = query.where("courseName").regex(new RegExp(search, "i"));
        }
        if (Array.isArray(category) &&
            category.length > 0 &&
            category[0] !== "All") {
            query = query.where("categoryId").in(category);
        }
        if (Array.isArray(instructor) &&
            instructor.length > 0 &&
            instructor[0] !== "") {
            query = query.where("mentorId").in(instructor);
        }
        if (Array.isArray(price) && price.length > 0) {
            const priceConditions = [];
            if (price.includes("Free")) {
                priceConditions.push({ coursePrice: 0 });
            }
            if (price.includes("Paid")) {
                priceConditions.push({ coursePrice: { $gt: 0 } });
            }
            if (priceConditions.length > 0) {
                query = query.or(priceConditions);
            }
        }
        // Pagination
        query = query.skip((page - 1) * limit).limit(limit);
        const courses = yield query.exec();
        const total = yield courseModel_1.default.countDocuments(query.getFilter());
        return {
            total,
            page,
            limit,
            courses: courses.map((course) => {
                const courseObject = course.toObject();
                courseObject.id = courseObject._id.toString();
                return courseObject;
            }),
        };
    }),
    readCourseByName: (courseName) => __awaiter(void 0, void 0, void 0, function* () {
        const courseByName = yield courseModel_1.default.findOne({ courseName });
        if (!courseByName) {
            return null;
        }
        const courseObject = courseByName.toObject();
        courseObject.id = courseObject._id.toString();
        return courseObject;
    }),
    readCourseById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const courseById = yield courseModel_1.default.findById(id);
        if (!courseById) {
            return null;
        }
        const courseObject = courseById.toObject();
        courseObject.id = courseObject._id.toString();
        return courseObject;
    }),
    updateCourse: (course) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(course);
        const updatedCourse = yield courseModel_1.default.findByIdAndUpdate(course.id, course, { new: true });
        if (!updatedCourse) {
            throw new Error("Course not found");
        }
        const courseObject = updatedCourse.toObject();
        courseObject.id = courseObject._id.toString();
        return courseObject;
    }),
    readCourse: (queryData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, page = 1, limit = 10, search = "", category = [], price = [], } = queryData;
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
            let FinalcourseQuery = {
                mentorId: userId,
                _id: { $in: matchingCourseIds },
            };
            const total = yield courseModel_1.default.countDocuments(FinalcourseQuery);
            const courses = yield courseModel_1.default.find(FinalcourseQuery)
                .populate("categoryId")
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
            return {
                total,
                page,
                limit,
                courses,
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
    readTotalCourses: (mentorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const totalCourses = yield courseModel_1.default.countDocuments({ mentorId });
            return totalCourses;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
};
