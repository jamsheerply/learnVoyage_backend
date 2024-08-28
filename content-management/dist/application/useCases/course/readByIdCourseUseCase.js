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
exports.readByIdCourseUseCase = void 0;
const readByIdCourseUseCase = (CourseRepository) => {
    return (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Attempt to read the course by ID
            const course = yield CourseRepository.readCourseById(id);
            // Check if the course was found
            if (!course) {
                throw new Error("Course not found");
            }
            return course;
        }
        catch (error) {
            // Log the error and rethrow it
            console.error(`Error reading course with ID ${id}:`, error);
            throw error;
        }
    });
};
exports.readByIdCourseUseCase = readByIdCourseUseCase;
