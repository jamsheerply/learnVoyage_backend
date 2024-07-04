import jwt from "jsonwebtoken";
import { ITokenRepository } from "../../../domain/interfaces/repositories/ITokenRepositroy";
import jwtDecode from "jwt-decode";
import { ObjectId } from "mongoose";

// Convert jwtDecode to a function with a generic type through 'unknown'
const jwtDecodeFunction = jwtDecode as unknown as <T>(token: string) => T;

// Service to verify refresh tokens
const verifyRefreshToken = (REFRESH_TOKEN_PRIVATE_KEY: string) => {
  return async (refreshToken: string) => {
    try {
      // Verify the access token using the private key
      const verified = jwt.verify(refreshToken, REFRESH_TOKEN_PRIVATE_KEY);
      return verified;
    } catch (error) {
      // Handle any errors that occur during token verification
      console.error("refresh token verification failed:", error);
      throw new Error("refresh token verification failed test");
    }
  };
};

export { verifyRefreshToken };
