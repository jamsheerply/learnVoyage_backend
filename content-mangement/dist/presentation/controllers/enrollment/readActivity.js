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
exports.readEnrollmentActivityController = void 0;
const readEnrollmentActivityUseCase_1 = require("../../../application/useCases/enrollment/readEnrollmentActivityUseCase");
const enrollmentRepositoryImp_1 = require("../../../infrastructure/database/repositories/enrollmentRepositoryImp");
const readEnrollmentActivityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const enrollmentActivity = yield (0, readEnrollmentActivityUseCase_1.readEnrollmentActivityUseCase)(enrollmentRepositoryImp_1.EnrollmentRepository)(userId);
        return res.status(200).json({ success: true, data: enrollmentActivity });
    }
    catch (error) {
        const customError = error;
        console.error("Error fetching readEnrollmentActivity", error);
        return res
            .status(500)
            .json({ success: false, error: customError === null || customError === void 0 ? void 0 : customError.message });
    }
});
exports.readEnrollmentActivityController = readEnrollmentActivityController;
