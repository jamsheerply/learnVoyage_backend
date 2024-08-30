import { paymentEntity } from "../../domain/entities/paymentEntity";
import { IDependencies } from "../interfaces/IDependencies";

export const updatePaymentUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { updatePayment },
  } = dependencies;
  return {
    execute: async (data: paymentEntity) => {
      return await updatePayment(data);
    },
  };
};
