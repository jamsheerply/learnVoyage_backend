import { IDependencies } from "../interfaces/IDependencies";
import { userEntity } from "../../domain/entities/userEntity";

export const createUserUserCase = (dependencies: IDependencies) => {
  const {
    repositories: { createUser },
  } = dependencies;
  return {
    execute: async (data: userEntity) => {
      return await createUser(data);
    },
  };
};
