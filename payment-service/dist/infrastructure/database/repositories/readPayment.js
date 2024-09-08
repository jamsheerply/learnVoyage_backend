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
exports.readPayment = void 0;
const models_1 = require("../models");
const readPayment = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, search = "", method = [], status = [], } = queryData;
        const pipeline = [];
        // Lookup stage to populate courseId
        pipeline.push({
            $lookup: {
                from: "courses",
                localField: "courseId",
                foreignField: "_id",
                as: "course",
            },
        });
        // Unwind the course array
        pipeline.push({ $unwind: "$course" });
        // Lookup stage to populate userId
        pipeline.push({
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            },
        });
        // Unwind the user array
        pipeline.push({ $unwind: "$user" });
        // Lookup stage to populate mentorId
        pipeline.push({
            $lookup: {
                from: "users",
                localField: "course.mentorId",
                foreignField: "_id",
                as: "mentor",
            },
        });
        // Unwind the mentor array (use preserveNullAndEmptyArrays to keep payments even if they don't have a mentor)
        pipeline.push({
            $unwind: {
                path: "$mentor",
                preserveNullAndEmptyArrays: true,
            },
        });
        // Match stage
        const matchStage = {};
        if (search) {
            matchStage.$or = [
                { "course.courseName": { $regex: search, $options: "i" } },
                { "mentor.firstName": { $regex: search, $options: "i" } },
            ];
        }
        if (method.length > 0) {
            matchStage.method = { $in: method };
        }
        if (status.length > 0) {
            matchStage.status = { $in: status };
        }
        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage });
        }
        // Count total documents
        const countPipeline = [...pipeline, { $count: "total" }];
        const totalResult = yield models_1.PaymentModel.aggregate(countPipeline);
        const total = totalResult.length > 0 ? totalResult[0].total : 0;
        // Add pagination
        pipeline.push({ $skip: (page - 1) * limit });
        pipeline.push({ $limit: limit });
        // Sort
        pipeline.push({ $sort: { createdAt: -1 } });
        // Project stage to reshape the output
        pipeline.push({
            $project: {
                _id: 1,
                userId: "$user._id",
                userFirstName: "$user.firstName",
                userLastName: "$user.lastName",
                courseId: "$course._id",
                courseName: "$course.courseName",
                courseThumbnailUrl: "$course.courseThumbnailUrl",
                mentorId: "$mentor._id",
                mentorFirstName: "$mentor.firstName",
                mentorLastName: "$mentor.lastName",
                method: 1,
                status: 1,
                amount: 1,
                createdAt: 1,
            },
        });
        const payments = yield models_1.PaymentModel.aggregate(pipeline);
        return {
            total,
            page,
            limit,
            payments,
        };
    }
    catch (error) {
        console.error("Error reading payments:", error);
        throw new Error("Failed to read payments");
    }
});
exports.readPayment = readPayment;
