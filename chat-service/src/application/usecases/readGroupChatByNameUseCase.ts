import { IDependencies } from "../interfaces/IDependencies";

export const readGroupChatByNameUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { readGroupChatByName },
  } = dependencies;
  return {
    execute: async (chatName: string) => {
      return await readGroupChatByName(chatName);
    },
  };
};
