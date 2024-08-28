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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
        userObject.id = userObject._id.toString();
        return userObject;
    }),
    getUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            const userObject = user.toObject();
            userObject.id = userObject._id.toString();
            return userObject;
        }
        return null;
    }),
    getUserById: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.default.findById(userId);
        if (user) {
            const userObject = user.toObject();
            userObject.id = userObject._id.toString();
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
            userObject.id = userObject._id.toString();
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
    getProfileById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const profileById = yield userModel_1.default.findById(id);
            return profileById;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    updateProfile: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id } = userData, rest = __rest(userData, ["_id"]);
            // console.log("rest", rest);
            const updatedProfile = yield userModel_1.default.findByIdAndUpdate(userData._id, rest, { new: true });
            // console.log("repository", updatedProfile);
            return updatedProfile;
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    readTotalStudentsAndInstructors: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const readUser = yield userModel_1.default.aggregate([
                {
                    $match: {
                        isVerified: true,
                        role: { $in: ["student", "instructor"] },
                    },
                },
                {
                    $group: {
                        _id: "$role",
                        total: { $sum: 1 },
                    },
                },
            ]);
            console.log("readUser", readUser);
            return {
                totalIntructors: readUser[0].total,
                totalStudents: readUser[1].total,
            };
        }
        catch (error) {
            const customError = error;
            throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
        }
    }),
    // readTopInstructors:async()=>{
    //   try {
    //   } catch (error) {
    //   }
    // }
};
