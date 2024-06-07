import { Request, Response, NextFunction } from "express";

const roleMiddleware = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (!user || user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Access Denied. Insufficient permissions." });
    }

    next();
  };
};

export default roleMiddleware;
