import { IRepositories } from "./repositories";
import { IUseCase } from "./useCase";

export interface IDependencies {
  repositories: IRepositories;
  useCase: IUseCase;
}
