import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controller";
import { jwtMiddleware } from "../../_lib/jwt/verifyToken";

export const chatRoutes = (dependencies: IDependencies) => {
  const router = Router();
  const {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroupChat,
    addToGroupChat,
    removeFromGroupChat,
    searchUser,
  } = controllers(dependencies);
  router.get("/search", jwtMiddleware, searchUser);
  router.post("/access-chat", jwtMiddleware, accessChat);
  router.get("/fetch-chats", jwtMiddleware, fetchChats);
  router.post("/create-groupchat", jwtMiddleware, createGroupChat);
  router.patch("/rename-groupchat", jwtMiddleware, renameGroupChat);
  router.patch("/add-groupchat", jwtMiddleware, addToGroupChat);
  router.patch("/remove-groupchat", jwtMiddleware, removeFromGroupChat);
  return router;
};
