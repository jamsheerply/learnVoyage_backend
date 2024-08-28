import { Request, Response, NextFunction } from "express";

const roleMiddleware = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);

    if (!req.user || req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Access Denied. Insufficient permissions." });
    }

    next();
  };
};

export default roleMiddleware;
