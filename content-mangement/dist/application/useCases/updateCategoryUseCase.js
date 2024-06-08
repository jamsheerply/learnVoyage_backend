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
exports.updateCategoryUseCase = void 0;
const updateCategoryUseCase = (categoryRepository) => {
    return (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
        const existingCategory = yield categoryRepository.readByIdCategory(categoryData.id);
        if (!existingCategory) {
            throw new Error("Category not found");
        }
        const updatedCategory = yield categoryRepository.updateCategory(categoryData);
        return updatedCategory;
    });
};
exports.updateCategoryUseCase = updateCategoryUseCase;
