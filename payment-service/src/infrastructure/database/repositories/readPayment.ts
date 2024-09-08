import { PipelineStage } from "mongoose";
import { paymentEntity } from "../../../domain/entities/paymentEntity";
import { PaymentModel } from "../models";

export const readPayment = async (queryData: {
  page: number;
  limit: number;
  search?: string;
  method?: string[];
  status?: string[];
}): Promise<{
  total: number;
  page: number;
  limit: number;
  payments: paymentEntity[];
} | null> => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      method = [],
      status = [],
    } = queryData;

    const pipeline: PipelineStage[] = [];

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
    const matchStage: PipelineStage.Match["$match"] = {};
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
    const totalResult = await PaymentModel.aggregate(countPipeline);
    const total = totalResult.length > 0 ? totalResult[0].total : 0;

    // Add pagination
    pipeline.push({ $skip: (page - 1) * limit } as PipelineStage.Skip);
    pipeline.push({ $limit: limit } as PipelineStage.Limit);

    // Sort
    pipeline.push({ $sort: { createdAt: -1 } } as PipelineStage.Sort);

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

    const payments = await PaymentModel.aggregate(pipeline);

    return {
      total,
      page,
      limit,
      payments,
    };
  } catch (error) {
    console.error("Error reading payments:", error);
    throw new Error("Failed to read payments");
  }
};
