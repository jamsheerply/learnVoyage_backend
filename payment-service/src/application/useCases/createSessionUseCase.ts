import { sessionEntity } from "../../domain/entities/sessionEntity";
import { IDependencies } from "../interfaces/IDependencies";

export const createSessionUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createSession },
  } = dependencies;
  return {
    execute: async (data: sessionEntity) => {
      return await createSession(data);
    },
  };
};
