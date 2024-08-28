import { IDependencies } from "../interfaces/IDependencies";

export const readPaymentTotalRevenueUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { readPaymentTotalRevene },
  } = dependencies;
  return {
    execute: async () => {
      return await readPaymentTotalRevene();
    },
  };
};
