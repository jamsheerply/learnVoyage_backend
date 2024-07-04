import { IToken } from "../../entities/token.enity";

// Interface for token repository
export interface ITokenRepository {
  /**
   * Retrieve the token for a user by their ID
   * @param userId - The ID of the user
   * @returns A promise that resolves to the user's token or null if not found
   */
  getTokenByUserId(userId: string): Promise<IToken | null>;

  /**
   * Update the token for a user
   * @param userId - The ID of the user
   * @param token - The new token
   * @returns A promise that resolves when the update is complete
   */
  updateToken(userId: string, token: string): Promise<void>;

  /**
   * Add a new token for a user
   * @param userId - The ID of the user
   * @param token - The token to be added
   * @returns A promise that resolves to the created token
   */
  addToken(userId: string, token: string): Promise<IToken>;
}
