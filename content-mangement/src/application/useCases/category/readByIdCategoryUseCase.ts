import { ICategory } from "../../../domain/entities/category.entity";
import { ICategoryRepository } from "../../../domain/interfaces/repositories/ICategoryRepositoty";

export const readByIdCategoryUseCase = (
  categoryRepository: ICategoryRepository
) => {
  return async (id: string): Promise<ICategory | null> => {
    const readById = await categoryRepository.readByIdCategory(id);
    return readById;
  };
};
