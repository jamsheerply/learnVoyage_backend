import { Iuser } from "../entities/user.entity";

export interface IRepositories {
  signup: (data: Iuser) => Promise<Iuser | null>;
}
