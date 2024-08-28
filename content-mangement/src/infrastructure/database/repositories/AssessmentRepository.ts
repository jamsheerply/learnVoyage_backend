import { CustomError } from "../../../_lib/common/customError";
import { AssessmentEntity } from "../../../domain/entities/assessmentEntity";
import { IAssessmentRepository } from "../../../domain/interfaces/repositories/IAssessmentRepository";
import { AssessmentModel } from "../models/assessmentModel";
import CourseModel from "../models/courseModel";

export const AssessmentRepository: IAssessmentRepository = {
  createAssessment: async (createData: AssessmentEntity) => {
    try {
      const newAssessment = await AssessmentModel.create(createData);
      await newAssessment.populate("courseId");
      return newAssessment;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  readAssessment: async (queryData: {
    userId: string;
    page: number;
    limit: number;
    search?: string;
  }) => {
    try {
      const { userId, page = 1, limit = 6, search = "" } = queryData;

      let courseQuery: any = {};
      if (search) {
        console.log("Search Term:", search);
        courseQuery.courseName = { $regex: `^${search}`, $options: "i" };
      }
      const matchingCourseIds = await CourseModel.find(courseQuery).distinct(
        "_id"
      );

      // Now query the Enrollment model
      let assessmentQuery: any;
      if (userId) {
        assessmentQuery = {
          instructorId: userId,
          courseId: { $in: matchingCourseIds },
        };
      } else {
        assessmentQuery = {
          courseId: { $in: matchingCourseIds },
        };
      }
      const total = await AssessmentModel.countDocuments(assessmentQuery);
      const assessments = await AssessmentModel.find(assessmentQuery)
        .populate("courseId")
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return {
        total,
        page,
        limit,
        assessments,
      };
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  readAssessmentById: async (id) => {
    try {
      const assessmentById = await AssessmentModel.findById(id).populate(
        "courseId"
      );
      console.log("assessmentById", assessmentById);
      return assessmentById;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  updateAssessment: async (assesment) => {
    try {
      const updateAssessment = await AssessmentModel.findByIdAndUpdate(
        assesment._id,
        assesment,
        { new: true }
      );
      if (!updateAssessment) {
        throw new Error("assessment not found");
      }
      return updateAssessment;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  readAssessmentByCourseId: async (courseId) => {
    try {
      const assessmentByCourseId = await AssessmentModel.findOne({
        courseId,
      }).populate("courseId");
      return assessmentByCourseId;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
};
