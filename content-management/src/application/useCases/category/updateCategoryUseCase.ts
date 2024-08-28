import { ICategory } from "../../../domain/entities/category.entity";
import { ICategoryRepository } from "../../../domain/interfaces/repositories/ICategoryRepositoty";

export const updateCategoryUseCase = (
  categoryRepository: ICategoryRepository
) => {
  return async (categoryData: ICategory): Promise<ICategory | null> => {
    const existingCategory = await categoryRepository.readByIdCategory(
      categoryData.id
    );

    // Check if the category name already exists in another category
    if (categoryData.categoryName) {
      const categoryByName = await categoryRepository.readByNameCategory(
        categoryData.categoryName
      );
      if (categoryByName && categoryByName.id !== categoryData.id) {
        throw new Error("Category name already exists");
      }
    }

    if (!existingCategory) {
      throw new Error("Category not found");
    }

    const updatedCategory = await categoryRepository.updateCategory(
      categoryData
    );
    return updatedCategory;
  };
};
