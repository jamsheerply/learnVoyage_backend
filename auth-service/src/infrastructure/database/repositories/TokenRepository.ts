import { ITokenRepository } from "../../../domain/interfaces/repositories/ITokenRepositroy";
import TokenModel from "../models/tokenModel";

// Implementation of the ITokenRepository interface
export const TokenRepository: ITokenRepository = {
  /**
   * Retrieve the token for a user by their ID
   * @param userId - The ID of the user
   * @returns A promise that resolves to the user's token
   */
  async getTokenByUserId(userId) {
    try {
      // Find the token document by userId
      const token = await TokenModel.findOne({ userId });
      return token; // Return null if not found, instead of throwing an error
    } catch (error) {
      // Handle any errors that occur during the database operation
      console.error("Error fetching token:", error);
      throw error;
    }
  },

  /**
   * Update the token for a user
   * @param userId - The ID of the user
   * @param token - The new token
   * @returns A promise that resolves when the update is complete
   */
  async updateToken(userId, token) {
    try {
      // Update the token document for the specified userId
      await TokenModel.updateOne({ userId }, { token });
    } catch (error) {
      // Handle any errors that occur during the database operation
      console.error("Error updating token:", error);
      throw error;
    }
  },

  /**
   * Add a new token for a user
   * @param userId - The ID of the user
   * @param token - The token to be added
   * @returns A promise that resolves to the created token
   */
  async addToken(userId, token) {
    try {
      // Create a new token document
      const newToken = new TokenModel({ userId, token });
      await newToken.save();
      return newToken;
    } catch (error) {
      // Handle any errors that occur during the database operation
      console.error("Error adding token:", error);
      throw error;
    }
  },
};
