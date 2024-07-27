"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, reqiured: true },
    email: { type: String, requred: true },
    password: { type: String },
    pic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
