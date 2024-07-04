import jwt from "jsonwebtoken";

// Service to verify access tokens
const verifyAccessToken = (ACCESS_TOKEN_PRIVATE_KEY: string) => {
  return (accessToken: string) => {
    try {
      // Verify the access token using the private key
      const verified = jwt.verify(accessToken, ACCESS_TOKEN_PRIVATE_KEY);
      return verified;
    } catch (error) {
      // Handle any errors that occur during token verification
      console.error("Access token verification failed:", error);
      throw new Error("Access token verification failed");
    }
  };
};

export { verifyAccessToken };
