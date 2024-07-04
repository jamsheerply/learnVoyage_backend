"use strict";
// import jwt from "jsonwebtoken";
// import { ITokenRepository } from "../../../domain/interfaces/repositories/ITokenRepositroy";
// import jwtDecode from "jwt-decode";
// import { ObjectId } from "mongoose";
// // Convert jwtDecode to a function with a generic type through 'unknown'
// const jwtDecodeFunction = jwtDecode as unknown as <T>(token: string) => T;
// const verifyJwtTokenService = (
//   tokenRepository: ITokenRepository,
//   ACCESS_TOKEN_PRIVATE_KEY: string,
//   REFRESH_TOKEN_PRIVATE_KEY: string
// ) => {
//   return {
//     // Verify Access Token
//     verifyAccessToken: (accessToken: string) => {
//       try {
//         // Verify the access token using the private key
//         const verified = jwt.verify(accessToken, ACCESS_TOKEN_PRIVATE_KEY);
//         return verified;
//       } catch (error) {
//         // Handle any errors that occur during token verification
//         console.error("Access token verification failed:", error);
//         throw new Error("Access token verification failed");
//       }
//     },
//     // Verify Refresh Token
//     verifyRefreshToken: async (refreshToken: string) => {
//       try {
//         // Use jwtDecodeFunction with the correct typing
//         const decoded = jwtDecodeFunction<{ userId: ObjectId }>(refreshToken);
//         // Convert ObjectId to string
//         const userIdString = decoded.userId.toString();
//         // Fetch the token data from the repository using the user ID
//         const tokenData = await tokenRepository.getTokenByUserId(userIdString);
//         // If no token data is found, throw an error
//         if (!tokenData) {
//           throw new Error("Token not found in repository");
//         }
//         // Verify the refresh token using the private key
//         const verified = jwt.verify(refreshToken, REFRESH_TOKEN_PRIVATE_KEY);
//         // If verification is successful, return the verified data
//         return verified;
//       } catch (error) {
//         // Handle any errors that occur during token verification
//         console.error("Refresh token verification failed:", error);
//         throw new Error("Refresh token verification failed");
//       }
//     },
//   };
// };
// export { verifyJwtTokenService };
