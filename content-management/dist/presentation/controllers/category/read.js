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
exports.readAllCategoryController = void 0;
const readAllCategoryUseCase_1 = require("../../../application/useCases/readAllCategoryUseCase");
const CategoryRepositoryImpl_ts_1 = require("../../../infrastructure/database/repositories/category/CategoryRepositoryImpl.ts");
const readAllCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readAllCategory = yield (0, readAllCategoryUseCase_1.readAllCategoryUseCase)(CategoryRepositoryImpl_ts_1.CategoryRepository)();
        return res.status(200).json({ success: true, data: readAllCategory }); // Use 200 OK for read operations
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.readAllCategoryController = readAllCategoryController;
