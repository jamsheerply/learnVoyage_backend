import { IDependencies } from "../interfaces/IDependencies";

export const getSessionByIdUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getSessionById },
  } = dependencies;

  return {
    execute: async (id: string) => {
      return await getSessionById(id);
    },
  };
};
