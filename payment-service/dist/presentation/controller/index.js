"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const createPaymentController_1 = require("./createPaymentController");
const downloadTransationsExcelController_1 = require("./downloadTransationsExcelController");
const downloadTransationsPdfController_1 = require("./downloadTransationsPdfController");
const readPaymentController_1 = require("./readPaymentController");
const readPaymentTotalRevenueController_1 = require("./readPaymentTotalRevenueController");
const updatePaymentController_1 = require("./updatePaymentController");
const controllers = (dependencies) => {
    return {
        createPayment: (0, createPaymentController_1.createPaymentController)(dependencies),
        updatePayment: (0, updatePaymentController_1.updatePaymentController)(dependencies),
        readPayment: (0, readPaymentController_1.readPaymentController)(dependencies),
        readPaymentTotalRevenue: (0, readPaymentTotalRevenueController_1.readPaymentTotalRevenueController)(dependencies),
        downloadTransationsPdf: (0, downloadTransationsPdfController_1.downloadTransationsPdfController)(dependencies),
        downloadTransationsExcel: (0, downloadTransationsExcelController_1.downloadTransationsExcelController)(dependencies),
    };
};
exports.controllers = controllers;
