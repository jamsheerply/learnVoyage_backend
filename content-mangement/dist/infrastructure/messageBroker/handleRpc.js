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
exports.createEnrollmentHandler = void 0;
const createEnrollmentUseCase_1 = require("../../application/useCases/enrollment/createEnrollmentUseCase");
const enrollmentRepositoryImp_1 = require("../database/repositories/enrollmentRepositoryImp");
const createEnrollmentHandler = (msg, channel) => __awaiter(void 0, void 0, void 0, function* () {
    const content = JSON.parse(msg.content.toString());
    console.log(" [.] Received message:", content.data);
    const newEnrollment = yield (0, createEnrollmentUseCase_1.createEnrollmentUsecase)(enrollmentRepositoryImp_1.EnrollmentRepository)(content.data);
    const response = {
        success: true,
        data: newEnrollment,
        message: "successfully created enrollment",
    };
    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
        correlationId: msg.properties.correlationId,
    });
    channel.ack(msg);
});
exports.createEnrollmentHandler = createEnrollmentHandler;
