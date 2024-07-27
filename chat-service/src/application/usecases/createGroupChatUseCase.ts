import { IDependencies } from "../interfaces/IDependencies";

export const createGroupChatUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createGroupChat },
  } = dependencies;
  return {
    execute: async (
      chatName: string,
      users: string[],
      currentUserId: string
    ) => {
      return await createGroupChat(chatName, users, currentUserId);
    },
  };
};
