import { courseEntity } from "../entities/courseEntity";

export interface ICreateCourseUseCase {
  execute(dat: courseEntity): Promise<courseEntity | null>;
}
