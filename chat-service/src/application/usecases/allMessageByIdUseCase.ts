import { dependencies } from "../../_boot/dependencies";
import { IDependencies } from "../interfaces/IDependencies";

export const allMessageByIdUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { allMessageById },
  } = dependencies;
  return {
    execute: async (chatId: string) => {
      return await allMessageById(chatId);
    },
  };
};
