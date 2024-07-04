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
exports.createCourseController = void 0;
const createCourseUseCase_1 = require("../../../application/useCases/course/createCourseUseCase");
const CourseRepository_1 = require("../../../infrastructure/database/repositories/CourseRepository");
const createCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCourse = Object.assign({ id: "" }, req.body);
        const createdCourse = yield (0, createCourseUseCase_1.createCourseUseCase)(CourseRepository_1.CourseRepository)(newCourse);
        if (!createdCourse) {
            return res
                .status(500)
                .json({ success: false, error: "Failed to create course" });
        }
        return res.status(201).json({ success: true, data: createdCourse });
    }
    catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.createCourseController = createCourseController;
