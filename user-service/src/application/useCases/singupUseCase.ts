import { Iuser } from "../../domain/entities/user.entity";
import { IDependencies } from "../../domain/interfaces";

export const signupUseCase = (dependecies: IDependencies) => {
  const {
    repositories: { signup },
  } = dependecies;
  return {
    execute: async (data: Iuser) => {
      try {
        return await signup(data);
      } catch (error: any) {
        throw new Error(error);
      }
    },
  };
};
