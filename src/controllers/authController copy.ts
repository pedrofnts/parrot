import { NotFoundError } from "./../helpers/AppErrors";
import { Request, Response } from "express";
import { User } from "../entities/User";
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
  async changePassword(req: Request, res: Response) {
    const { oldPassword, newPassword } = req.body;

    const user = await userRepository.findOneBy({ id: req.user.id });

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      throw new BadRequestError("Senha incorreta");
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    userRepository.merge(user, { password: hashPassword });

    await userRepository.save(user);

    return res.json("Senha alterada com sucesso");
  }
}
