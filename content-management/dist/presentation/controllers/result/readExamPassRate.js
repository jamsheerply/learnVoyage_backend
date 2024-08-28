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
exports.readResultExamPassRateController = void 0;
const ResultRepositoryImp_1 = require("../../../infrastructure/database/repositories/ResultRepositoryImp");
const readResultExamPassRateUseCase_1 = require("../../../application/useCases/result/readResultExamPassRateUseCase");
const readResultExamPassRateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const resultExamPassRate = yield (0, readResultExamPassRateUseCase_1.readResultExamPassRateUseCase)(ResultRepositoryImp_1.ResultRepository)(userId);
        return res.status(200).json({ success: true, data: resultExamPassRate });
    }
    catch (error) {
        const customError = error;
        console.log("Error fetching result", error);
        return res
            .status(500)
            .json({ success: false, error: customError === null || customError === void 0 ? void 0 : customError.message });
    }
});
exports.readResultExamPassRateController = readResultExamPassRateController;
