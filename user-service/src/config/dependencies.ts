import * as repositories from "../infrastructure/database/mongodb/repositories";
import { IDependencies } from "../domain/interfaces";
import { useCase } from "../application";
export const dependecies: IDependencies = {
  repositories,
  useCase,
};
