import { NextFunction, Response, Request } from "express";
import { userRepository } from "../repositories/userRepository";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  const token = authorization.replace("Bearer", "").trim();

  const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as {
    id: number;
  };

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    return res.status(404).json({ message: "Não autorizado" });
  }

  const { password: _, ...userWithoutPassword } = user;

  req.user = userWithoutPassword;

  next();
};
