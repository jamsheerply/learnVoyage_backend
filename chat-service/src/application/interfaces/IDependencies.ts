import { IRepositories } from "./IRepositories";
import { IUseCase } from "./IUseCase";

export interface IDependencies {
  repositories: IRepositories;
  useCases: IUseCase;
}
