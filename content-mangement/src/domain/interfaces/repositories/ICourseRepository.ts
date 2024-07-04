import { ICourse } from "../../entities/course.entity";
import { ICourseQuery } from "../../entities/courseQuery";

export interface ICourseRepository {
  createCourse(course: ICourse): Promise<ICourse>;
  readAllCourses(queryData: ICourseQuery): Promise<{
    total: number;
    page: number;
    limit: number;
    courses: ICourse[];
  }>;
  readCourseByName(courseName: string): Promise<ICourse | null>;
  readCourseById(id: string): Promise<ICourse | null>;
  updateCourse(course: ICourse): Promise<ICourse>;
}
