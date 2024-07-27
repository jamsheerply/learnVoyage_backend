import { dependencies } from "../../_boot/dependencies";
import { IDependencies } from "../interfaces/IDependencies";

export const searchUserUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { searchUser },
  } = dependencies;
  return {
    execute: async (keyword: string, currentd: string) => {
      return await searchUser(keyword, currentd);
    },
  };
};
