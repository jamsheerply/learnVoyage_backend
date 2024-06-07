import { Request, Response, NextFunction } from "express";
import { verifyJwtTokenService } from "../../infrastructure/security/jwt";

const authMiddleware = (secret: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied. No token provided." });
    }

    try {
      const verifyService = verifyJwtTokenService(secret);
      const decoded = verifyService.verifyToken(token);
      res.locals.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token." });
    }
  };
};

export default authMiddleware;
