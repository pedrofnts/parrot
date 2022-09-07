import { AppError } from "./../helpers/AppErrors";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  err: Error & Partial<AppError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: "Internal server error" });
};
