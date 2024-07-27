import { chatEntity } from "../entities/chatEntity";

export interface IcreatGroupChatUseCase {
  execute(
    chatName: string,
    users: string[],
    currentUserId: string
  ): Promise<chatEntity | null>;
}
