import { CustomError } from "../../../_lib/common/customError";
import { EnrollmentEntity } from "../../../domain/entities/enrollmentEntity";
import { paymentEntity } from "../../../domain/entities/paymentEntity";
import { IEnrollmentRepository } from "../../../domain/interfaces/repositories/IEnrollmentRespository";
import CourseModel from "../models/courseModel";
import { EnrollmentModel } from "../models/enrollmentModel";

export const EnrollmentRepository: IEnrollmentRepository = {
  createEnrollment: async (enrollmentData: paymentEntity) => {
    try {
      const data = {
        userId: enrollmentData.userId,
        courseId: enrollmentData.courseId,
      };

      const newEnrollment = await EnrollmentModel.create(data);
      await newEnrollment.populate("courseId");
      return newEnrollment;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },

  updateEnrollment: async (enrollmentData: EnrollmentEntity) => {
    try {
      const { _id, ...rest } = enrollmentData;
      const updatedEnrollment = await EnrollmentModel.findByIdAndUpdate(
        _id,
        rest,
        { new: true } // Ensure it returns the updated document
      );
      return updatedEnrollment;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },

  readEnrollment: async (queryData: {
    userId: string;
    page: number;
    limit: number;
    search?: string;
    category?: string[];
    instructor?: string[];
    price?: string[];
  }) => {
    try {
      const {
        userId,
        page = 1,
        limit = 10,
        search = "",
        category = [],
        instructor = [],
        price = [],
      } = queryData;
      console.log("Query Data:", JSON.stringify(queryData));

      // Start with a base query on the Course model
      let courseQuery: any = {};

      if (search) {
        console.log("Search Term:", search);
        courseQuery.courseName = { $regex: search, $options: "i" };
      }

      if (category.length > 0 && category[0] !== "All") {
        console.log("Category Filter:", category);
        const categoryIds = category[0].includes(",")
          ? category[0].split(",")
          : category;
        courseQuery.categoryId = { $in: categoryIds };
      }

      if (instructor.length > 0) {
        console.log("Instructor Filter:", instructor);
        const instructorIds = instructor[0].includes(",")
          ? instructor[0].split(",")
          : instructor;
        courseQuery.mentorId = { $in: instructorIds };
      }

      if (price.length > 0 && !price.includes("All")) {
        if (price.includes("Free") && price.includes("Paid")) {
          // Do nothing, as it includes all prices
        } else if (price.includes("Free")) {
          courseQuery.coursePrice = 0;
        } else if (price.includes("Paid")) {
          courseQuery.coursePrice = { $gt: 0 };
        }
      }

      // Find all course IDs that match the criteria
      const matchingCourseIds = await CourseModel.find(courseQuery).distinct(
        "_id"
      );

      // Now query the Enrollment model
      let enrollmentQuery = {
        userId: userId,
        courseId: { $in: matchingCourseIds },
      };

      const total = await EnrollmentModel.countDocuments(enrollmentQuery);

      const enrollments = await EnrollmentModel.find(enrollmentQuery)
        .populate("courseId")
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      console.log("Enrollments Found:", JSON.stringify(enrollments));
      console.log("Total Enrollments:", total);

      return {
        total,
        page,
        limit,
        enrollments,
      };
    } catch (error) {
      console.error("Error in readEnrollment:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to read enrollments: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while reading enrollments");
      }
    }
  },
  getEnrollmentById: async (id: string) => {
    try {
      const enrollmentById = await EnrollmentModel.findById(id).populate(
        "courseId"
      );
      return enrollmentById;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  getEnrollmentByCourseId: async (courseId: string, userId: string) => {
    try {
      const enrollmentByUserId = await EnrollmentModel.findOne({
        courseId: courseId,
        userId: userId,
      });

      if (!enrollmentByUserId) {
        throw new Error(
          "No enrollment found for the given courseId and userId"
        );
      }

      return enrollmentByUserId;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
};
