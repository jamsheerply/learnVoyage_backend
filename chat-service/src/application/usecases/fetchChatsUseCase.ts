import { IDependencies } from "../interfaces/IDependencies";

export const fetchChatsUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { fetchChats },
  } = dependencies;
  return {
    execute: async (currentUserId: string) => {
      return await fetchChats(currentUserId);
    },
  };
};
