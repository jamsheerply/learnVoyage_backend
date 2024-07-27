import { IUser } from "../../domain/entities/IUser";
import { userEntity } from "../../domain/entities/userEntity";
import { IDependencies } from "../interfaces/IDependencies";

export const createUserUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createUser },
  } = dependencies;
  return {
    execute: async (data: IUser) => {
      return await createUser(data);
    },
  };
};
