import { chatEntity } from "../entities/chatEntity";

export interface IAllMessageByIdUseCase {
  execute(chatId: string): Promise<chatEntity[] | null>;
}
