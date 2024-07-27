import { IDependencies } from "../application/interfaces/IDependencies";
import * as repositories from "../infrastructure/database/repositories";
import * as useCases from "../application/usecases";
export const dependencies: IDependencies = {
  repositories,
  useCases,
};
