import { IDependencies } from "../../application/interfaces/IDependencies";
import { createPaymentController } from "./createPaymentController";
import { readPaymentController } from "./readPaymentController";
import { readPaymentTotalRevenueController } from "./readPaymentTotalRevenueController";
import { updatePaymentController } from "./updatePaymentController";

export const controllers = (dependencies: IDependencies) => {
  return {
    createPayment: createPaymentController(dependencies),
    updatePayment: updatePaymentController(dependencies),
    readPayment: readPaymentController(dependencies),
    readPaymentTotalRevenue: readPaymentTotalRevenueController(dependencies),
  };
};
