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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchChats = void 0;
const models_1 = require("../models");
const fetchChats = (currentUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find chats where the current user is a participant
        const results = yield models_1.ChatModel.find({
            users: { $elemMatch: { $eq: currentUserId } },
        })
            .populate("users") // Populate user details
            .populate("groupAdmin") // Populate group admin details
            .populate("latestMessage") // Populate latest message details
            .sort({ updatedAt: -1 }) // Sort by the updated time in descending order
            .exec(); // Execute the query
        // Populate the sender details of the latest message in each chat
        const populatedResults = yield models_1.UserModel.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
        });
        // console.log("populatedResults", JSON.stringify(populatedResults));
        // Convert the results to plain objects and cast them to chatEntity
        return populatedResults.map((result) => result.toObject());
    }
    catch (error) {
        // Handle any errors that occur
        const customError = error;
        throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
    }
});
exports.fetchChats = fetchChats;
