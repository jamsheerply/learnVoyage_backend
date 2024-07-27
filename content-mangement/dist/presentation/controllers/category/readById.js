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
exports.readByIdCategoryController = void 0;
const readByIdCategoryUseCase_1 = require("../../../application/useCases/category/readByIdCategoryUseCase");
const CategoryRepositoryImpl_ts_1 = require("../../../infrastructure/database/repositories/CategoryRepositoryImpl.ts");
const readByIdCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(req.params);
        const readByIdCategory = yield (0, readByIdCategoryUseCase_1.readByIdCategoryUseCase)(CategoryRepositoryImpl_ts_1.CategoryRepository)(id);
        return res.status(200).json({ success: true, data: readByIdCategory });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.readByIdCategoryController = readByIdCategoryController;
