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
exports.updateCategoryController = void 0;
const updateCategoryUseCase_1 = require("../../../application/useCases/updateCategoryUseCase");
const CategoryRepositoryImpl_ts_1 = require("../../../infrastructure/database/repositories/category/CategoryRepositoryImpl.ts");
const updateCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCategory = yield (0, updateCategoryUseCase_1.updateCategoryUseCase)(CategoryRepositoryImpl_ts_1.CategoryRepository)(req.body);
        if (!updatedCategory) {
            return res
                .status(500)
                .json({ success: false, error: "Failed to update category!" });
        }
        return res.status(200).json({ success: true, data: updatedCategory });
    }
    catch (error) {
        if (error.message === "Category not found") {
            return res
                .status(404)
                .json({ success: false, error: "Category not found" });
        }
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateCategoryController = updateCategoryController;
