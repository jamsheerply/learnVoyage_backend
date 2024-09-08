import { Types } from "mongoose";
import { CustomError } from "../../../_lib/common/customError";
import { EnrollmentEntity } from "../../../domain/entities/enrollmentEntity";
import { paymentEntity } from "../../../domain/entities/paymentEntity";
import { IEnrollmentRepository } from "../../../domain/interfaces/repositories/IEnrollmentRespository";
import CourseModel from "../models/courseModel";
import { EnrollmentModel } from "../models/enrollmentModel";
import { ResultModel } from "../models/resultModel";
// import { RateAndReviewModal } from "../models/rateAndReviewModel";
// interface ActivityData {
//   [key: string]: { date: string; enrollment?: number; exam?: number };
// }
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
        { new: true }
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

      // if (!enrollmentByUserId) {
      //   throw new Error(
      //     "No enrollment found for the given courseId and userId"
      //   );
      // }

      return enrollmentByUserId;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  readCompleteCourse: async (userId) => {
    try {
      const enrollmentCompleteCourses = await EnrollmentModel.aggregate([
        { $match: { userId } },
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        { $unwind: "$courseDetails" },
        {
          $addFields: {
            completedLessonsCount: { $size: "$progress.completedLessons" },
            totalLessonsCount: { $size: "$courseDetails.lessons" },
          },
        },
        {
          $addFields: {
            completedPercentage: {
              $multiply: [
                {
                  $divide: ["$completedLessonsCount", "$totalLessonsCount"],
                },
                100,
              ],
            },
          },
        },
        {
          $project: {
            _id: 0,
            courseName: "$courseDetails.courseName",
            completedPercentage: { $round: ["$completedPercentage", 2] },
          },
        },
      ]);

      return enrollmentCompleteCourses;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  readEnrollmentActivity: async (userId) => {
    try {
      const userIdObject = new Types.ObjectId(userId);
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - (10 - 1) * 5); // 9 gaps of 5 days each

      const [enrollmentActivity, examActivity] = await Promise.all([
        EnrollmentModel.aggregate([
          {
            $match: {
              userId,
              enrolledAt: { $gte: startDate, $lte: endDate },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$enrolledAt" },
              },
              enrollment: { $sum: 1 },
            },
          },
        ]),
        ResultModel.aggregate([
          {
            $match: {
              userId: userIdObject,
              createdAt: { $gte: startDate, $lte: endDate },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
              exam: { $sum: 1 },
            },
          },
        ]),
      ]);

      const combinedActivity: {
        [key: string]: { date: string; enrollment: number; exam: number };
      } = {};

      // Generate all 10 dates with 5-day gaps
      for (let i = 0; i < 10; i++) {
        const currentDate = new Date(endDate);
        currentDate.setDate(currentDate.getDate() - i * 5);
        const dateString = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD format
        combinedActivity[dateString] = {
          date: dateString,
          enrollment: 0,
          exam: 0,
        };
      }

      // Ensure dates are correctly matched and counted
      enrollmentActivity.forEach((item) => {
        const date = item._id;
        if (combinedActivity[date]) {
          combinedActivity[date].enrollment = item.enrollment;
        }
      });

      examActivity.forEach((item) => {
        const date = item._id;
        if (combinedActivity[date]) {
          combinedActivity[date].exam = item.exam;
        }
      });

      // Convert to array and sort by date (most recent first)
      const result = Object.values(combinedActivity).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      console.log("Result:", result);

      console.log("enrollmentActivity", enrollmentActivity);
      console.log("examActivity", examActivity);

      return null;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  readRecentEnrollment: async (userId) => {
    try {
      const recentEnrollment = await EnrollmentModel.aggregate([
        {
          $match: {
            userId: userId,
          },
        },
        {
          $sort: {
            enrolledAt: -1,
          },
        },
        {
          $limit: 4,
        },
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        {
          $unwind: "$course",
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            courseId: 1,
            enrolledAt: 1,
            progress: 1,
            course: {
              _id: 1,
              mentorId: 1,
              courseName: 1,
              categoryId: 1,
              description: 1,
              language: 1,
              coursePrice: 1,
              courseThumbnailUrl: 1,
              courseDemoVideo: 1,
              id: 1,
              isBlocked: 1,
              reason: 1,
              lessons: 1,
              createdAt: 1,
              updatedAt: 1,
            },
          },
        },
      ]);

      return recentEnrollment;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  readTopCourses: async () => {
    try {
      const topCourses = await EnrollmentModel.aggregate([
        {
          $group: {
            _id: "$courseId",
            totalEnrollments: { $sum: 1 },
          },
        },
        {
          $sort: { totalEnrollments: -1 },
        },
        {
          $lookup: {
            from: "courses",
            localField: "_id",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        {
          $unwind: "$courseDetails",
        },
        {
          $project: {
            courseId: "$_id",
            totalEnrollments: 1,
            courseName: "$courseDetails.courseName",
            mentorId: "$courseDetails.mentorId",
            lessons: "$courseDetails.lessons",
            courseThumbnailUrl: "$courseDetails.courseThumbnailUrl",
          },
        },
      ]);

      return topCourses;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
  readCourseStatus: async () => {
    try {
      const CourseStatus = await EnrollmentModel.aggregate([
        {
          $group: {
            _id: "$courseId",
            totalEnrollments: { $sum: 1 },
          },
        },
        {
          $sort: { totalEnrollments: -1 },
        },
        {
          $lookup: {
            from: "courses",
            localField: "_id",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        {
          $unwind: "$courseDetails",
        },
        {
          $lookup: {
            from: "categories",
            let: { categoryId: { $toObjectId: "$courseDetails.categoryId" } },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$categoryId"] } } },
            ],
            as: "categoryDetails",
          },
        },
        {
          $unwind: "$categoryDetails",
        },
        {
          $project: {
            courseId: "$_id",
            totalEnrollments: 1,
            courseName: "$courseDetails.courseName",
            mentorId: "$courseDetails.mentorId",
            lessons: "$courseDetails.lessons",
            courseThumbnailUrl: "$courseDetails.courseThumbnailUrl",
            categoryId: "$courseDetails.categoryId",
            categoryName: "$categoryDetails.categoryName",
            coursePrice: "$courseDetails.coursePrice",
            totalRevenue: {
              $multiply: ["$totalEnrollments", "$courseDetails.coursePrice"],
            },
          },
        },
      ]);
      return CourseStatus;
    } catch (error) {
      const customError = error as CustomError;
      console.log("courseStatus", customError.message);
      throw new Error(customError?.message);
    }
  },
  readByInstructorId: async (mentorId) => {
    try {
      const courses = await CourseModel.find({ mentorId: mentorId });
      const courseIds = courses.map((course) => course._id);
      const enrollmentsForMentor = await EnrollmentModel.find({
        courseId: { $in: courseIds },
      }).populate("courseId");

      const totalEnrollments = enrollmentsForMentor.length;
      return totalEnrollments;
    } catch (error) {
      const customError = error as CustomError;
      console.log("courseStatus", customError.message);
      throw new Error(customError?.message);
    }
  },
  readTotalRevenue: async (mentorId) => {
    try {
      const courses = await CourseModel.find({ mentorId: mentorId });
      const courseIds = courses.map((course) => course._id);
      const totalRevenue = await EnrollmentModel.aggregate([
        { $match: { courseId: { $in: courseIds } } },
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        {
          $unwind: "$course",
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: {
                $cond: [
                  { $gt: ["$course.coursePrice", 0] },
                  "$course.coursePrice",
                  0,
                ],
              },
            },
          },
        },
      ]);

      return totalRevenue[0].totalRevenue;
    } catch (error) {
      const customError = error as CustomError;
      console.log("courseStatus", customError.message);
      throw new Error(customError?.message);
    }
  },
  readTopEnrollments: async (mentorId) => {
    try {
      const result = await CourseModel.aggregate([
        {
          $match: { mentorId },
        },
        {
          $lookup: {
            from: "enrollments",
            localField: "_id",
            foreignField: "courseId",
            as: "enrollments",
          },
        },
        {
          $lookup: {
            from: "rateandreviews",
            localField: "_id",
            foreignField: "courseId",
            as: "commentsAndRatings",
          },
        },
        {
          $addFields: {
            numberOfEnrollments: { $size: "$enrollments" },
            numberOfComments: { $size: "$commentsAndRatings" },
            greatestRating: { $max: "$commentsAndRatings.rating" },
          },
        },
        {
          $project: {
            courseName: 1,
            numberOfEnrollments: 1,
            numberOfComments: 1,
            greatestRating: 1,
            coursePrice: 1,
          },
        },
      ]);

      return result;
    } catch (error) {
      const customError = error as CustomError;
      console.log("courseStatus", customError.message);
      throw new Error(customError?.message);
    }
  },
};
