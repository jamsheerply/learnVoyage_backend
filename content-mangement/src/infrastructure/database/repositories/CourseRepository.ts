import mongoose, { Document, FilterQuery } from "mongoose";
import { ICourse } from "../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../domain/interfaces/repositories/ICourseRepository";
import { ICourseQuery } from "../../../domain/entities/courseQuery";
import CourseModel from "../models/courseModel";

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
};
