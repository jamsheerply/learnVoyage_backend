import { IDependencies } from "../interfaces/IDependencies";

export const readPaymentUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { readPayment },
  } = dependencies;

  return {
    execute: async (queryData: {
      page: number;
      limit: number;
      search?: string;
      method?: string[];
      status?: string[];
    }) => {
      return await readPayment(queryData);
    },
  };
};
