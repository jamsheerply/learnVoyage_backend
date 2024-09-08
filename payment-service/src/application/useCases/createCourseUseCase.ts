import { courseEntity } from "../../domain/entities/courseEntity";
import { IDependencies } from "../interfaces/IDependencies";

export const createCourseUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createCourse },
  } = dependencies;
  return {
    execute: async (data: courseEntity) => {
      return await createCourse(data);
    },
  };
};
