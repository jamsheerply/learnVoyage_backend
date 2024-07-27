import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { jwtMiddleware } from "../../_lib/jwt/verifyToken";
import { controllers } from "../../presentation/controller";

export const messageRoutes = (dependencies: IDependencies) => {
  const router = Router();
  const { createMessage, allMessageById } = controllers(dependencies);
  router.post("/create-message", jwtMiddleware, createMessage);
  router.get("/getMessageById/:chatId", jwtMiddleware, allMessageById);
  return router;
};
