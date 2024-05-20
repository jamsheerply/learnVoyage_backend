import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controller } from "../../presentation/controller";

export const userRoutes = (dependecies: IDependencies) => {
  const { signup } = controller(dependecies);

  const router = Router();
  router.route("/signup").post(signup);
  return router;
};
