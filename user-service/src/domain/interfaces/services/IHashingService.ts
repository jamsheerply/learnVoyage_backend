export interface IHashingService {
  hash(password: string): Promise<string>;
}
