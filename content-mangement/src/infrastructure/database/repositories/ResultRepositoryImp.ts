import mongoose, { Types } from "mongoose";
import { CustomError } from "../../../_lib/common/customError";
import { IResultRespository } from "../../../domain/interfaces/repositories/IResultRepository";
import { ResultModel } from "../models/resultModel";
import { PopulatedResult } from "../../../domain/entities/resultEntity";
import { EnrollmentModel } from "../models/enrollmentModel";

export const ResultRepository: IResultRespository = {
  createResult: async (resultData) => {
    try {
      const newResult = await ResultModel.create(resultData);
      await newResult.populate("assessmentId");
      return newResult;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  readResultByAssessmentId: async (userId, assessmentId) => {
    try {
      const readResultByAssessmentId = await ResultModel.findOne({
        userId,
        assessmentId,
      });
      await readResultByAssessmentId?.populate("assessmentId");
      return readResultByAssessmentId;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  readResult: async (queryData: {
    userId?: string;
    page?: number;
    limit?: number;
    search?: string;
    filter?: "completed" | "failed" | "pending";
  }) => {
    try {
      const { userId, page = 1, limit = 6, search = "", filter } = queryData;

      // Create a base query
      let query = ResultModel.find();

      // Add userId filter if provided
      if (userId) {
        query = query.where("userId").equals(new Types.ObjectId(userId));
      }

      // Add status filter if provided
      if (filter) {
        query = query.where("status").equals(filter);
      }

      // Prepare the populate options
      const populateOptions: any = {
        path: "assessmentId",
        populate: {
          path: "courseId",
          populate: {
            path: "categoryId",
          },
        },
      };

      // Add search functionality
      if (search) {
        console.log("search", search);
        populateOptions.populate.match = {
          $or: [
            { courseName: { $regex: search, $options: "i" } },
            { "categoryId.categoryName": { $regex: search, $options: "i" } },
          ],
        };
      }

      // Apply the populate options
      query = query.populate(populateOptions);

      // Get total count before pagination
      const total = await ResultModel.countDocuments(query.getFilter());

      // Add pagination
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(Number(limit));

      // Execute query
      let results = (await query.exec()) as unknown as PopulatedResult[];

      // Filter out results where courseId is null (due to search not matching)
      results = results.filter(
        (result) => result.assessmentId && result.assessmentId.courseId
      );
      return {
        total,
        page: Number(page),
        limit: Number(limit),
        results,
      };
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  readResultExamsPassRate: async (userId) => {
    try {
      const userIdObject = new mongoose.Types.ObjectId(userId);
      // Count total enrollments
      const totalEnrollments = await EnrollmentModel.countDocuments({ userId });

      // Aggregate results
      const resultAggregation = await ResultModel.aggregate([
        { $match: { userId: userIdObject } },
        {
          $group: {
            _id: null,
            passed: {
              $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
            },
            failed: { $sum: { $cond: [{ $eq: ["$status", "failed"] }, 1, 0] } },
          },
        },
      ]);

      // Extract results or set defaults if no results found
      const { passed = 0, failed = 0 } = resultAggregation[0] || {};

      // Calculate pending
      const pending = totalEnrollments - (passed + failed);

      // Calculate percentages
      const calculatePercentage = (value: number) =>
        totalEnrollments > 0 ? Math.round((value / totalEnrollments) * 100) : 0;

      return {
        passed: calculatePercentage(passed),
        failed: calculatePercentage(failed),
        pending: calculatePercentage(pending),
      };
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
};
