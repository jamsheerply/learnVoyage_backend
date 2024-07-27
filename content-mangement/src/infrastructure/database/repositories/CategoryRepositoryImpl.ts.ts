import { ICategory } from "../../../domain/entities/category.entity";
import { ICategoryRepository } from "../../../domain/interfaces/repositories/ICategoryRepositoty";
import CategoryModel from "../models/categoryModel";
import { Document } from "mongoose";

interface ICategoryWithId extends ICategory, Document {
  _id: string;
  id: string;
}

export const CategoryRepository: ICategoryRepository = {
  createCategory: async (category: ICategory): Promise<ICategory> => {
    const newCategory = new CategoryModel(category);
    await newCategory.save();
    const categoryObject = newCategory.toObject() as ICategoryWithId;
    categoryObject.id = categoryObject._id.toString();
    return categoryObject;
  },
  readAllCategory: async (): Promise<ICategory[]> => {
    const categories = await CategoryModel.find();
    return categories.map((category) => {
      const categoryObject = category.toObject() as ICategoryWithId;
      categoryObject.id = categoryObject._id.toString();
      return categoryObject;
    });
  },
  readByNameCategory: async (
    categoryName: string
  ): Promise<ICategory | null> => {
    const categoryByName = await CategoryModel.findOne({ categoryName });
    if (!categoryByName) {
      return null;
    }
    const categoryObject = categoryByName.toObject() as ICategoryWithId;
    categoryObject.id = categoryObject._id.toString();
    return categoryObject;
  },
  readByIdCategory: async (id: string): Promise<ICategory | null> => {
    const categoryById = await CategoryModel.findById(id);
    if (!categoryById) {
      return null;
    }
    const categoryObject = categoryById.toObject() as ICategoryWithId;
    categoryObject.id = categoryObject._id.toString();
    return categoryObject;
  },
  updateCategory: async (category: ICategory): Promise<ICategory> => {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      category.id,
      category,
      { new: true }
    );
    if (!updatedCategory) {
      throw new Error("Category not found");
    }
    const categoryObject = updatedCategory.toObject() as ICategoryWithId;
    categoryObject.id = categoryObject._id.toString();
    return categoryObject;
  },
};
