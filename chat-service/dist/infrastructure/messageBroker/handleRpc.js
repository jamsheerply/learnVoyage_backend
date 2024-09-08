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
exports.addToGroupChat = exports.createGroupChat = exports.createChatWithAdmin = exports.createUserHandler = void 0;
const dependencies_1 = require("../../_boot/dependencies");
const usecases_1 = require("../../application/usecases");
const createUserHandler = (msg, channel) => __awaiter(void 0, void 0, void 0, function* () {
    const content = JSON.parse(msg.content.toString());
    // console.log(" [.] Received message:createUserHandler", content.data);
    const newUser = yield (0, usecases_1.createUserUseCase)(dependencies_1.dependencies).execute(content.data);
    const response = {
        success: true,
        data: newUser,
        message: "successfully created",
    };
    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
        correlationId: msg.properties.correlationId,
    });
    channel.ack(msg);
});
exports.createUserHandler = createUserHandler;
const createChatWithAdmin = (msg, channel) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const content = JSON.parse(msg.content.toString());
    // console.log(" [.] Received message:createChatWithAdmin", content.data);
    const ChatWithAdmin = yield (0, usecases_1.accessChatUseCase)(dependencies_1.dependencies).execute("6694bc2c0b5eac20cf0f49c8", content.data);
    if (ChatWithAdmin) {
        yield (0, usecases_1.createMessageUseCase)(dependencies_1.dependencies).execute("6694bc2c0b5eac20cf0f49c8", (_a = ChatWithAdmin._id) === null || _a === void 0 ? void 0 : _a.toString(), "Hi! Thank you for joining Learn Voyage. Feel free to chat with me anytime in the future. Have a nice day!");
    }
    const response = {
        success: true,
        data: ChatWithAdmin,
        message: "successfully created",
    };
    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
        correlationId: msg.properties.correlationId,
    });
    channel.ack(msg);
});
exports.createChatWithAdmin = createChatWithAdmin;
const createGroupChat = (msg, channel) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const content = JSON.parse(msg.content.toString());
    console.log(" [.] Received message:createGroupChat", content.data);
    const createGropChat = yield (0, usecases_1.createGroupChatUseCase)(dependencies_1.dependencies).execute(content.data.courseName, [content.data.mentorId, "6694bc2c0b5eac20cf0f49c8"], "6694bc2c0b5eac20cf0f49c8");
    if (createGropChat) {
        yield (0, usecases_1.createMessageUseCase)(dependencies_1.dependencies).execute("6694bc2c0b5eac20cf0f49c8", (_a = createGropChat._id) === null || _a === void 0 ? void 0 : _a.toString(), `Hi ! Thank you for creating the course named ${content.data.courseName}. Continue your discussions! After enrollment, students can ask questions and clear their doubts within the community here.`);
    }
    const response = {
        success: true,
        data: createGropChat,
        message: "successfully created",
    };
    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
        correlationId: msg.properties.correlationId,
    });
    channel.ack(msg);
});
exports.createGroupChat = createGroupChat;
const addToGroupChat = (msg, channel) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const content = JSON.parse(msg.content.toString());
    console.log(" [.] Received message:addToGroupChat::", content.data.data);
    console.log("content.data.courseId.courseName", (_c = (_b = (_a = content.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.courseId) === null || _c === void 0 ? void 0 : _c.courseName);
    const groupChat = yield (0, usecases_1.readGroupChatByNameUseCase)(dependencies_1.dependencies).execute((_f = (_e = (_d = content.data) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.courseId) === null || _f === void 0 ? void 0 : _f.courseName);
    console.log("groupChat", groupChat);
    if (groupChat === null || groupChat === void 0 ? void 0 : groupChat._id) {
        yield (0, usecases_1.addToGroupChatUseCase)(dependencies_1.dependencies).execute((_g = groupChat._id) === null || _g === void 0 ? void 0 : _g.toString(), (_j = (_h = content.data) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.userId);
    }
    const response = {
        success: true,
        data: "groupChat",
        message: "successfully created",
    };
    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
        correlationId: msg.properties.correlationId,
    });
    channel.ack(msg);
});
exports.addToGroupChat = addToGroupChat;
