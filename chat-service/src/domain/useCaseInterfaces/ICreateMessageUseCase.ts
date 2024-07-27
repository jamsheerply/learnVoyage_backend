import { messageEntity } from "../entities/messageEntity";

export interface ICreateMessageUseCase {
  execute(
    currentUserId: string,
    chatId: string,
    content: string
  ): Promise<messageEntity | null>;
}
