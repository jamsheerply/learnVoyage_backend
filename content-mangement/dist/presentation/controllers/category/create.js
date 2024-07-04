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
exports.createCategoryController = void 0;
const createCategoryUseCase_1 = require("../../../application/useCases/category/createCategoryUseCase");
const CategoryRepositoryImpl_ts_1 = require("../../../infrastructure/database/repositories/category/CategoryRepositoryImpl.ts");
// This is the controller function to handle the request and response for creating a category
const createCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { categoryName, image } = req.body;
        const newCategory = Object.assign({ id: "" }, req.body);
        const createdCategory = yield (0, createCategoryUseCase_1.createCategoryUseCase)(CategoryRepositoryImpl_ts_1.CategoryRepository)(newCategory);
        console.log(createdCategory);
        if (!createdCategory) {
            // If category creation fails, send a 500 error response
            return res
                .status(500)
                .json({ success: false, error: "Failed to create category!" });
        }
        // Successful category creation
        return res.status(201).json({ success: true, data: createdCategory });
    }
    catch (error) {
        // Error handling for duplicate category
        if (error.message === "Category already exists") {
            return res
                .status(400)
                .json({ success: false, error: "Category already exists" });
        }
        // Generic error handling for other errors
        return res
            .status(500)
            .json({ success: false, error: "Failed to create category" });
    }
});
exports.createCategoryController = createCategoryController;
