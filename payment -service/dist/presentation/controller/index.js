"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const createPaymentController_1 = require("./createPaymentController");
const readPaymentController_1 = require("./readPaymentController");
const updatePaymentController_1 = require("./updatePaymentController");
const controllers = (dependencies) => {
    return {
        createPayment: (0, createPaymentController_1.createPaymentController)(dependencies),
        updatePayment: (0, updatePaymentController_1.updatePaymentController)(dependencies),
        readPayment: (0, readPaymentController_1.readPaymentController)(dependencies),
    };
};
exports.controllers = controllers;
