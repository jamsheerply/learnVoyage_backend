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
exports.readCourseTotalCoursesController = void 0;
const CourseRepository_1 = require("../../../infrastructure/database/repositories/CourseRepository");
const readCourseTotalCoursesUseCase_1 = require("../../../application/useCases/course/readCourseTotalCoursesUseCase");
const readCourseTotalCoursesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const mentorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const totalCoursse = yield (0, readCourseTotalCoursesUseCase_1.readCourseTotalCoursesUseCase)(CourseRepository_1.CourseRepository)(mentorId === null || mentorId === void 0 ? void 0 : mentorId.toString());
        return res.status(200).json({ success: true, data: totalCoursse });
    }
    catch (error) {
        const customError = error;
        return res
            .status(500)
            .json({ success: false, error: customError === null || customError === void 0 ? void 0 : customError.message });
    }
});
exports.readCourseTotalCoursesController = readCourseTotalCoursesController;
