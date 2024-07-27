import { chatEntity } from "../entities/chatEntity";

export interface IFetchChatUseCase {
  execute(currentUserId: string): Promise<chatEntity[] | null>;
}
