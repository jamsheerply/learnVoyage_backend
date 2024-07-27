import { Router } from "express";
import { controllers } from "../../presentation/controller";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const paymentRoutes = (dependencies: IDependencies) => {
  const router = Router();
  const { createPayment, updatePayment, readPayment } =
    controllers(dependencies);
  router.post("/create-payment", createPayment);
  router.post("/update-payment", updatePayment);
  router.get("/read-payment", readPayment);
  return router;
};
