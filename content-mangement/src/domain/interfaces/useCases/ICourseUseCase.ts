import { ICourse } from "../../entities/course.entity";

export interface ICourseUseCase {
  createCourseUseCase(courseData: ICourse): Promise<ICourse | null>;
  readAllCoursesUseCase(): Promise<ICourse[] | null>;
  readCourseByIdUseCase(id: string): Promise<ICourse | null>;
  updateCourseUseCase(courseData: ICourse): Promise<ICourse | null>;
}
