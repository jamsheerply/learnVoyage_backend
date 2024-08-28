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
exports.readEnrollmentController = void 0;
const readEnrollmentUseCase_1 = require("../../../application/useCases/enrollment/readEnrollmentUseCase");
const enrollmentRepositoryImp_1 = require("../../../infrastructure/database/repositories/enrollmentRepositoryImp");
const readEnrollmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { page, limit, search, category, instructor, price } = req.query;
        // Convert query parameters to the expected types
        const queryData = {
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10) || 10,
            search: search || undefined,
            category: Array.isArray(category)
                ? category
                : category
                    ? [category]
                    : [],
            instructor: Array.isArray(instructor)
                ? instructor
                : instructor
                    ? [instructor]
                    : [],
            price: Array.isArray(price)
                ? price
                : price
                    ? [price]
                    : [],
        };
        const readEnrollment = yield (0, readEnrollmentUseCase_1.readEnrollmentUseCase)(enrollmentRepositoryImp_1.EnrollmentRepository)(queryData);
        return res.status(200).json({ success: true, data: readEnrollment });
    }
    catch (error) {
        const customError = error;
        console.error("Error read enrollment", error);
        return res
            .status(500)
            .json({ success: false, error: customError === null || customError === void 0 ? void 0 : customError.message });
    }
});
exports.readEnrollmentController = readEnrollmentController;
