import { chatEntity } from "../entities/chatEntity";

export interface IAccessChatUseCase {
  execute(userId: string, currentUserId: string): Promise<chatEntity | null>;
}
