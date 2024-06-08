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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
exports.CategoryRepository = {
    createCategory: (category) => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = new categoryModel_1.default(category);
        yield newCategory.save();
        const categoryObject = newCategory.toObject();
        categoryObject.id = categoryObject._id.toString();
        return categoryObject;
    }),
    readAllCategory: () => __awaiter(void 0, void 0, void 0, function* () {
        const categories = yield categoryModel_1.default.find();
        return categories.map((category) => {
            const categoryObject = category.toObject();
            categoryObject.id = categoryObject._id.toString();
            return categoryObject;
        });
    }),
    readByNameCategory: (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
        const categoryByName = yield categoryModel_1.default.findOne({ categoryName });
        if (!categoryByName) {
            return null;
        }
        const categoryObject = categoryByName.toObject();
        categoryObject.id = categoryObject._id.toString();
        return categoryObject;
    }),
    readByIdCategory: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const categoryById = yield categoryModel_1.default.findById(id);
        if (!categoryById) {
            return null;
        }
        const categoryObject = categoryById.toObject();
        categoryObject.id = categoryObject._id.toString();
        return categoryObject;
    }),
    updateCategory: (category) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedCategory = yield categoryModel_1.default.findByIdAndUpdate(category.id, category, { new: true });
        if (!updatedCategory) {
            throw new Error("Category not found");
        }
        const categoryObject = updatedCategory.toObject();
        categoryObject.id = categoryObject._id.toString();
        return categoryObject;
    }),
};
