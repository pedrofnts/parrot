import { NotFoundError } from "./../helpers/AppErrors";
import { Request, Response } from "express";
import { User } from "../infrastructure/database/entities/User";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../helpers/AppErrors";

export class authController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundError("Usuário ou senha inválidos");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestError("Usuário ou senha inválidos");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? "", {
      expiresIn: "1d",
    });

    const { password: _, ...userWithoutPassword } = user;

    return res.json({ userWithoutPassword, token });
  }
  async getProfile(req: Request, res: Response) {
    return res.json(req.user);
  }
}
