import { paymentEntity } from "../../domain/entities/paymentEntity";
import { IDependencies } from "../interfaces/IDependencies";

export const createPaymentUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createPayment },
  } = dependencies;

  return {
    execute: async (data: paymentEntity) => {
      return await createPayment(data);
    },
  };
};
