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
exports.createCourseHandler = exports.createUserHandler = void 0;
const dependencies_1 = require("../../_boot/dependencies");
const useCases_1 = require("../../application/useCases");
const createUserHandler = (msg, channel) => __awaiter(void 0, void 0, void 0, function* () {
    const content = JSON.parse(msg.content.toString());
    console.log(" [.] Received message:", content.data);
    const userData = {
        _id: content.data._id,
        firstName: content.data.firstName,
        lastName: content.data.lastName,
        role: content.data.role,
    };
    const newUser = yield (0, useCases_1.createUserUserCase)(dependencies_1.dependencies).execute(userData);
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
const createCourseHandler = (msg, channel) => __awaiter(void 0, void 0, void 0, function* () {
    const content = JSON.parse(msg.content.toString());
    console.log(" [.] Received message:", content.data);
    const CourseData = {
        _id: content.data._id,
        courseName: content.data.courseName,
        courseThumbnailUrl: content.data.courseThumbnailUrl,
        mentorId: content.data.mentorId,
    };
    const newUser = yield (0, useCases_1.createCourseUseCase)(dependencies_1.dependencies).execute(CourseData);
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
exports.createCourseHandler = createCourseHandler;
