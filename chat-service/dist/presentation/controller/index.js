"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const accessChatController_1 = require("./accessChatController");
const addToGroupController_1 = require("./addToGroupController");
const allMessageByIdController_1 = require("./allMessageByIdController");
const createGroupChatController_1 = require("./createGroupChatController");
const createMessageController_1 = require("./createMessageController");
const fetchChatsController_1 = require("./fetchChatsController");
const removeFromGroupChatController_1 = require("./removeFromGroupChatController");
const renameGroupChatController_1 = require("./renameGroupChatController");
const searchUsercontroller_1 = require("./searchUsercontroller");
const controllers = (dependencies) => {
    return {
        accessChat: (0, accessChatController_1.accessChatController)(dependencies),
        fetchChats: (0, fetchChatsController_1.fetchChatsController)(dependencies),
        createGroupChat: (0, createGroupChatController_1.createGroupChatController)(dependencies),
        renameGroupChat: (0, renameGroupChatController_1.renameGroupChatController)(dependencies),
        addToGroupChat: (0, addToGroupController_1.addToGroupController)(dependencies),
        removeFromGroupChat: (0, removeFromGroupChatController_1.removeFromGroupController)(dependencies),
        searchUser: (0, searchUsercontroller_1.SearchUserController)(dependencies),
        createMessage: (0, createMessageController_1.createMessageController)(dependencies),
        allMessageById: (0, allMessageByIdController_1.allMessageByIdController)(dependencies),
    };
};
exports.controllers = controllers;
