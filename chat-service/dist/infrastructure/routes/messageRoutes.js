"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoutes = void 0;
const express_1 = require("express");
const verifyToken_1 = require("../../_lib/jwt/verifyToken");
const controller_1 = require("../../presentation/controller");
const messageRoutes = (dependencies) => {
    const router = (0, express_1.Router)();
    const { createMessage, allMessageById } = (0, controller_1.controllers)(dependencies);
    router.post("/create-message", verifyToken_1.jwtMiddleware, createMessage);
    router.get("/getMessageById/:chatId", verifyToken_1.jwtMiddleware, allMessageById);
    return router;
};
exports.messageRoutes = messageRoutes;
