import { sessionEntity } from "../entities/sessionEntity";

export interface IGetSessionByIdUseCase {
  execute(id: string): Promise<sessionEntity | null>;
}
