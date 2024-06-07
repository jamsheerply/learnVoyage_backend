"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
exports.UserRepository = {
    addUser: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = new userModel_1.default(user);
        yield newUser.save();
        const userObject = newUser.toObject();
        userObject.id = userObject._id.toString(); // Map _id to id and convert to string
        return userObject;
    }),
    getUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            const userObject = user.toObject();
            userObject.id = userObject._id.toString(); // Map _id to id and convert to string
            return userObject;
        }
        return null;
    }),
    getUserById: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.default.findById(userId);
        if (user) {
            const userObject = user.toObject();
            userObject.id = userObject._id.toString(); // Map _id to id and convert to string
            return userObject;
        }
        return null;
    }),
    updateUserVerificationStatus: (userId, isVerified) => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel_1.default.findByIdAndUpdate(userId, { isVerified });
    }),
    updateOtp: (userId, otp) => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel_1.default.findByIdAndUpdate(userId, { otp });
    }),
    getAllRole: (role) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userModel_1.default.find({ role });
        return users.map((user) => {
            const userObject = user.toObject();
            userObject.id = userObject._id.toString(); // Map _id to id and convert to string
            return userObject;
        });
    }),
    editInstructor: (id, isBlocked) => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel_1.default.updateOne({ _id: id }, { isBlocked });
        const instructors = yield userModel_1.default.find({ role: "instructor" });
        return instructors.map((user) => {
            const userObject = user.toObject();
            userObject.id = userObject._id.toString();
            return userObject;
        });
    }),
};
