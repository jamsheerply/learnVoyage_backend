import { chatEntity } from "../../domain/entities/chatEntity";
import { IUser } from "../../domain/entities/IUser";
import { messageEntity } from "../../domain/entities/messageEntity";
import { userEntity } from "../../domain/entities/userEntity";

export interface IRepositories {
  // Method to create a user
  createUser: (data: IUser) => Promise<userEntity | null>;

  // Method to access a chat between two users
  accessChat: (
    userId: string,
    currentUserId: string
  ) => Promise<chatEntity | null>;

  // Method to fetch all chats for the current user
  fetchChats: (currentUserId: string) => Promise<chatEntity[] | null>;

  createGroupChat: (
    chatName: string,
    users: string[],
    currentUserId: string
  ) => Promise<chatEntity | null>;

  updateChatById: (
    chatId: string,
    data: chatEntity
  ) => Promise<chatEntity | null>;

  addToGroupChat: (
    chatId: string,
    userId: string
  ) => Promise<chatEntity | null>;

  removeFromGroupChat: (
    chatId: string,
    userId: string
  ) => Promise<chatEntity | null>;

  searchUser: (
    keyword: string,
    currentUserId: string
  ) => Promise<userEntity[] | null>;

  createMessage: (
    currentUserId: string,
    chatId: string,
    content: string
  ) => Promise<messageEntity | null>;

  allMessageById: (chatId: string) => Promise<chatEntity[] | null>;

  readGroupChatByName: (chatName: string) => Promise<chatEntity | null>;
}
