"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const verifyToken_1 = require("../../_lib/jwt/verifyToken");
const chatRoutes = (dependencies) => {
    const router = (0, express_1.Router)();
    const { accessChat, fetchChats, createGroupChat, renameGroupChat, addToGroupChat, removeFromGroupChat, searchUser, } = (0, controller_1.controllers)(dependencies);
    router.get("/search", verifyToken_1.jwtMiddleware, searchUser);
    router.post("/access-chat", verifyToken_1.jwtMiddleware, accessChat);
    router.get("/fetch-chats", verifyToken_1.jwtMiddleware, fetchChats);
    router.post("/create-groupchat", verifyToken_1.jwtMiddleware, createGroupChat);
    router.patch("/rename-groupchat", verifyToken_1.jwtMiddleware, renameGroupChat);
    router.patch("/add-groupchat", verifyToken_1.jwtMiddleware, addToGroupChat);
    router.patch("/remove-groupchat", verifyToken_1.jwtMiddleware, removeFromGroupChat);
    return router;
};
exports.chatRoutes = chatRoutes;
