import { Iuser } from "../entities/user.entity";

export interface ISingnupUseCase {
  execute(data: Iuser): Promise<Iuser | null>;
}
