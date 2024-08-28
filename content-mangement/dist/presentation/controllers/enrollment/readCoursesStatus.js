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
exports.readCoursesStatusController = void 0;
const readCoursesStatusUseCase_1 = require("../../../application/useCases/enrollment/readCoursesStatusUseCase");
const enrollmentRepositoryImp_1 = require("../../../infrastructure/database/repositories/enrollmentRepositoryImp");
const readCoursesStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readCourseStatus = yield (0, readCoursesStatusUseCase_1.readCoursesStatusUseCase)(enrollmentRepositoryImp_1.EnrollmentRepository)();
        return res.status(200).json({ success: true, data: readCourseStatus });
    }
    catch (error) {
        const customError = error;
        console.error("Error read recent enrollment", error);
        return res
            .status(500)
            .json({ success: false, error: customError === null || customError === void 0 ? void 0 : customError.message });
    }
});
exports.readCoursesStatusController = readCoursesStatusController;
