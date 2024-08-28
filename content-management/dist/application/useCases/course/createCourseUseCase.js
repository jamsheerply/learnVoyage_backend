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
exports.createCourseUseCase = void 0;
const createCourseUseCase = (CourseRepository) => {
    return (courseData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Check if the course already exists by name
            const existingCourse = yield CourseRepository.readCourseByName(courseData.courseName);
            if (existingCourse) {
                throw new Error("Course already exists");
            }
            // Create the new course
            const newCourse = yield CourseRepository.createCourse(courseData);
            return newCourse;
        }
        catch (error) {
            // Log the error and rethrow it
            console.error("Error creating course:", error.mesage);
            throw new Error(error.message);
        }
    });
};
exports.createCourseUseCase = createCourseUseCase;
