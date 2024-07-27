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
exports.createEnrollmentController = void 0;
const createEnrollmentUseCase_1 = require("../../../application/useCases/enrollment/createEnrollmentUseCase");
const enrollmentRepositoryImp_1 = require("../../../infrastructure/database/repositories/enrollmentRepositoryImp");
const createEnrollmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createEnrollment = yield (0, createEnrollmentUseCase_1.createEnrollmentUsecase)(enrollmentRepositoryImp_1.EnrollmentRepository)(req.body);
        if (!createEnrollment) {
            return res
                .status(500)
                .json({ success: false, error: "failed to create enrollment" });
        }
        return res.status(200).json({ success: true, data: createEnrollment });
    }
    catch (error) {
        const customError = error;
        console.error("Error create enrollment", error);
        return res
            .status(500)
            .json({ success: false, error: customError === null || customError === void 0 ? void 0 : customError.message });
    }
});
exports.createEnrollmentController = createEnrollmentController;
