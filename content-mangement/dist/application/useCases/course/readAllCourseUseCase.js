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
exports.readAllCoursesUseCase = void 0;
const readAllCoursesUseCase = (CourseRepository) => {
    return (queryData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Attempt to read all courses based on query parameters
            const courses = yield CourseRepository.readAllCourses(queryData);
            return courses;
        }
        catch (error) {
            // Log the error and rethrow it
            console.error("Error reading all courses:", error);
            throw new Error("Failed to read all courses");
        }
    });
};
exports.readAllCoursesUseCase = readAllCoursesUseCase;
