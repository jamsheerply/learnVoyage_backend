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
exports.updateCourseUseCase = void 0;
const updateCourseUseCase = (CourseRepository) => {
    return (courseData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Check if the course exists
            const existingCourse = yield CourseRepository.readCourseById(courseData.id);
            if (!existingCourse) {
                throw new Error("Course not found");
            }
            // Check if the course name already exists and belongs to a different course
            if (courseData.courseName) {
                const courseByName = yield CourseRepository.readCourseByName(courseData.courseName);
                if (courseByName && courseByName.id !== courseData.id) {
                    throw new Error("Course name already exists");
                }
            }
            // Update the course
            const updatedCourse = yield CourseRepository.updateCourse(courseData);
            return updatedCourse;
        }
        catch (error) {
            // Log the error and rethrow it to be handled by the caller
            console.error("Error updating course:", error);
            throw error;
        }
    });
};
exports.updateCourseUseCase = updateCourseUseCase;
