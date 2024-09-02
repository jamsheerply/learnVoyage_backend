import mongoose, { Document, FilterQuery } from "mongoose";
import { ICourse } from "../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../domain/interfaces/repositories/ICourseRepository";
import { ICourseQuery } from "../../../domain/entities/courseQuery";
import CourseModel from "../models/courseModel";
import { CustomError } from "../../../_lib/common/customError";

interface ICourseWithId extends ICourse, Document {
  _id: string;
  id: string;
}

export const CourseRepository: ICourseRepository = {
  createCourse: async (course) => {
    const newCourse = new CourseModel(course);
    await newCourse.save();
    const courseObject = newCourse.toObject() as ICourseWithId;
    courseObject.id = courseObject._id.toString();
    return courseObject;
  },

  readAllCourses: async (queryData: ICourseQuery) => {
    const {
      page = 1,
      limit = 5,
      search = "",
      category = [],
      instructor = [],
      price = [],
    } = queryData;
    // console.log(JSON.stringify(queryData));
    let query = CourseModel.find();

    // Unified Filter
    if (search) {
      query = query.where("courseName").regex(new RegExp(search, "i"));
    }
    if (
      Array.isArray(category) &&
      category.length > 0 &&
      category[0] !== "All"
    ) {
      query = query.where("categoryId").in(category);
    }
    if (
      Array.isArray(instructor) &&
      instructor.length > 0 &&
      instructor[0] !== ""
    ) {
      query = query.where("mentorId").in(instructor);
    }
    if (Array.isArray(price) && price.length > 0) {
      const priceConditions: FilterQuery<typeof CourseModel>[] = [];
      if (price.includes("Free")) {
        priceConditions.push({ coursePrice: 0 });
      }
      if (price.includes("Paid")) {
        priceConditions.push({ coursePrice: { $gt: 0 } });
      }
      if (priceConditions.length > 0) {
        query = query.or(priceConditions);
      }
    }

    // Pagination
    query = query.skip((page - 1) * limit).limit(limit);

    const courses = await query.exec();
    const total = await CourseModel.countDocuments(query.getFilter());
    return {
      total,
      page,
      limit,
      courses: courses.map((course) => {
        const courseObject = course.toObject() as ICourseWithId;
        courseObject.id = courseObject._id.toString();
        return courseObject;
      }),
    };
  },

  readCourseByName: async (courseName) => {
    const courseByName = await CourseModel.findOne({ courseName });
    if (!courseByName) {
      return null;
    }
    const courseObject = courseByName.toObject() as ICourseWithId;
    courseObject.id = courseObject._id.toString();
    return courseObject;
  },

  readCourseById: async (id) => {
    const courseById = await CourseModel.findById(id);
    if (!courseById) {
      return null;
    }
    const courseObject = courseById.toObject() as ICourseWithId;
    courseObject.id = courseObject._id.toString();
    return courseObject;
  },

  updateCourse: async (course) => {
    // console.log(course);
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      course.id,
      course,
      { new: true }
    );
    if (!updatedCourse) {
      throw new Error("Course not found");
    }
    const courseObject = updatedCourse.toObject() as ICourseWithId;
    courseObject.id = courseObject._id.toString();
    return courseObject;
  },
  readCourse: async (queryData: {
    userId: string;
    page: number;
    limit: number;
    search?: string;
    category?: string[];
    price?: string[];
  }) => {
    try {
      const {
        userId,
        page = 1,
        limit = 10,
        search = "",
        category = [],
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
      let FinalcourseQuery = {
        mentorId: userId,
        _id: { $in: matchingCourseIds },
      };

      const total = await CourseModel.countDocuments(FinalcourseQuery);

      const courses = await CourseModel.find(FinalcourseQuery)
        .populate("categoryId")
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      return {
        total,
        page,
        limit,
        courses,
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
  readTotalCourses: async (mentorId) => {
    try {
      const totalCourses = await CourseModel.countDocuments({ mentorId });
      return totalCourses;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  },
};
