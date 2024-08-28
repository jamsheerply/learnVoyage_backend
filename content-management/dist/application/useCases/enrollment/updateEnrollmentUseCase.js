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
exports.updateEnrollmentUseCase = void 0;
const updateEnrollmentUseCase = (EnrollmentRepository) => {
    return (enrollmentData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updateEnrollment = yield EnrollmentRepository.updateEnrollment(enrollmentData);
            return updateEnrollment;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    });
};
exports.updateEnrollmentUseCase = updateEnrollmentUseCase;
