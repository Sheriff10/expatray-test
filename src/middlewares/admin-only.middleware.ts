import { Request, Response, NextFunction } from "express";

const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};

export default adminOnly;
