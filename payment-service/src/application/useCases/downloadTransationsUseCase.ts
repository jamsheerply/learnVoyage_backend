import { IDependencies } from "../interfaces/IDependencies";

export const downloadTransationsUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { downloadTransations },
  } = dependencies;
  return {
    execute: async (startDate: string, endDate: string) => {
      return await downloadTransations(startDate, endDate);
    },
  };
};
