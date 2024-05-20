"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const signupController_1 = require("./signupController");
const controller = (dependencies) => {
    return {
        signup: (0, signupController_1.signupController)(dependencies),
    };
};
exports.controller = controller;
