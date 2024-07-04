// import { Request, Response } from "express";
// import { readAllCoursesUseCase } from "../../../application/useCases/course/readAllCourseUseCase";
// import { CourseRepository } from "../../../infrastructure/database/repositories/CourseRepository";
// import { ICourseQuery } from "../../../domain/entities/courseQuery";

// export const readAllCourseController = async (req: Request, res: Response) => {
//   try {
//     const queryData: ICourseQuery = {
//       page: parseInt(req.query.page as string),
//       limit: parseInt(req.query.limit as string),
//       search: (req.query.search as string) || "",
//       // sort: (req.query.sort as string) || "rating",
//       category: (req.query.category as string) || "All",
//       instructor: (req.query.instructor as string) || "",
//       price: (req.query.price as string) || "All",
//     };

//     const readAllCourses = await readAllCoursesUseCase(CourseRepository)(
//       queryData
//     );

//     return res.status(200).json({ success: true, data: readAllCourses });
//   } catch (error: any) {
//     console.error("Error reading all courses:", error);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// };

import { Request, Response } from "express";
import { readAllCoursesUseCase } from "../../../application/useCases/course/readAllCourseUseCase";
import { CourseRepository } from "../../../infrastructure/database/repositories/CourseRepository";
import { ICourseQuery } from "../../../domain/entities/courseQuery";

export const readAllCourseController = async (req: Request, res: Response) => {
  try {
    const queryData: ICourseQuery = {
      page: parseInt(req.query.page as string),
      limit: parseInt(req.query.limit as string),
      search: (req.query.search as string) || "",
      // sort: (req.query.sort as string) || "rating",
      category: (req.query.category as string)?.split(",") || [],
      instructor: (req.query.instructor as string)?.split(",") || [],
      price: (req.query.price as string)?.split(",") || [],
    };

    const readAllCourses = await readAllCoursesUseCase(CourseRepository)(
      queryData
    );

    return res.status(200).json({ success: true, data: readAllCourses });
  } catch (error: any) {
    console.error("Error reading all courses:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
