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
exports.createResultController = void 0;
const createResultUseCase_1 = require("../../../application/useCases/result/createResultUseCase");
const ResultRepositoryImp_1 = require("../../../infrastructure/database/repositories/ResultRepositoryImp");
const createResultController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createResult = yield (0, createResultUseCase_1.createResultUseCase)(ResultRepositoryImp_1.ResultRepository)(req.body);
        if (!createResult) {
            return res
                .status(500)
                .json({ success: false, error: "failed to create result" });
        }
        return res.status(200).json({ success: true, data: createResult });
    }
    catch (error) {
        const customError = error;
        console.error("Error create result", error);
        return res
            .status(500)
            .json({ success: false, error: customError === null || customError === void 0 ? void 0 : customError.message });
    }
});
exports.createResultController = createResultController;
