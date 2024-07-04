"use strict";
// import { Request, Response } from "express";
// import { readAllCoursesUseCase } from "../../../application/useCases/course/readAllCourseUseCase";
// import { CourseRepository } from "../../../infrastructure/database/repositories/CourseRepository";
// import { ICourseQuery } from "../../../domain/entities/courseQuery";
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
exports.readAllCourseController = void 0;
const readAllCourseUseCase_1 = require("../../../application/useCases/course/readAllCourseUseCase");
const CourseRepository_1 = require("../../../infrastructure/database/repositories/CourseRepository");
const readAllCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const queryData = {
            page: parseInt(req.query.page),
            limit: parseInt(req.query.limit),
            search: req.query.search || "",
            // sort: (req.query.sort as string) || "rating",
            category: ((_a = req.query.category) === null || _a === void 0 ? void 0 : _a.split(",")) || [],
            instructor: ((_b = req.query.instructor) === null || _b === void 0 ? void 0 : _b.split(",")) || [],
            price: ((_c = req.query.price) === null || _c === void 0 ? void 0 : _c.split(",")) || [],
        };
        const readAllCourses = yield (0, readAllCourseUseCase_1.readAllCoursesUseCase)(CourseRepository_1.CourseRepository)(queryData);
        return res.status(200).json({ success: true, data: readAllCourses });
    }
    catch (error) {
        console.error("Error reading all courses:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.readAllCourseController = readAllCourseController;
