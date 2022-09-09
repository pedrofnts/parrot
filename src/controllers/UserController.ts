import { BadRequestError, NotFoundError } from "./../helpers/AppErrors";
import { Request, Response } from "express";
import { User } from "../infrastructure/database/entities/User";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import { postRepository } from "../repositories/postRepository";

export class UserController {
  async index(req: Request, res: Response) {
    const users = await userRepository.find({
      select: ["id", "name", "apartment"],
    });
    return res.json(users);
  }

  async show(req: Request, res: Response) {
    const user = await userRepository.findOneBy({
      id: parseInt(req.params.id, 10),
    });

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const profile = await userRepository.find({
      relations: ["posts"],
      where: { id: user.id },
      select: { id: true, name: true, apartment: true },
    });

    return res.json({ profile });
  }

  async create(req: Request, res: Response) {
    const { name, email, apartment, password } = req.body;

    const userExists = await userRepository.findOneBy({ email });

    if (userExists) {
      throw new BadRequestError("E-mail já cadastrado");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      name,
      email,
      apartment,
      password: hashPassword,
    });

    await userRepository.save(newUser);
    const { password: _, ...user } = newUser;

    return res.status(201).json(`Usuário ${user.name} cadastrado com sucesso`);
  }

  async update(req: Request, res: Response) {
    const id = req.user.id;
    const { name, email, apartment, password } = req.body;

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundError("Perfil não encontrado");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    userRepository.merge(user, {
      name,
      email,
      apartment,
      password: hashPassword,
    });
    await userRepository.save(user);

    return res.json({ message: "Perfil atualizado com sucesso" });
  }

  async delete(req: Request, res: Response) {
    const id = req.user.id;

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestError("Usuário não encontrado");
    }

    await userRepository.remove(user);

    return res.json({ message: "Perfil removido com sucesso" });
  }
}
