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
exports.updateCourseController = void 0;
const updateCourseUseCase_1 = require("../../../application/useCases/course/updateCourseUseCase");
const CourseRepository_1 = require("../../../infrastructure/database/repositories/CourseRepository");
const updateCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCourse = yield (0, updateCourseUseCase_1.updateCourseUseCase)(CourseRepository_1.CourseRepository)(req.body);
        // console.log(JSON.stringify(updatedCourse));
        if (!updatedCourse) {
            return res
                .status(404)
                .json({ success: false, error: "Course not found" });
        }
        return res.status(200).json({ success: true, data: updatedCourse });
    }
    catch (error) {
        console.error("Error updating course:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateCourseController = updateCourseController;
