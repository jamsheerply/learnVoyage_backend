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
exports.readByIdCourseController = void 0;
const readByIdCourseUseCase_1 = require("../../../application/useCases/course/readByIdCourseUseCase");
const CourseRepository_1 = require("../../../infrastructure/database/repositories/CourseRepository");
const readByIdCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield (0, readByIdCourseUseCase_1.readByIdCourseUseCase)(CourseRepository_1.CourseRepository)(id);
        if (!course) {
            return res
                .status(404)
                .json({ success: false, error: "Course not found" });
        }
        return res.status(200).json({ success: true, data: course });
    }
    catch (error) {
        console.error("Error reading course by ID:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.readByIdCourseController = readByIdCourseController;
