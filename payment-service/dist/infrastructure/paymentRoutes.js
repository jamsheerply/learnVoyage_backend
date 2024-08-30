"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../presentation/controller");
const paymentRoutes = (dependencies) => {
    const router = (0, express_1.Router)();
    const { createPayment, updatePayment } = (0, controller_1.controllers)(dependencies);
    router.post("/create-payment", createPayment);
    router.post("/update-payment", updatePayment);
    return router;
};
exports.paymentRoutes = paymentRoutes;
