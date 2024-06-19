import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "../../../domain/entities/category.entity";

// Define a Mongoose schema for the category
const categorySchema: Schema = new Schema({
  categoryName: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
  image: { type: String },
});

// Create and export the Mongoose model
const CategoryModel = mongoose.model<ICategory & Document>(
  "Category",
  categorySchema
);

export default CategoryModel;
