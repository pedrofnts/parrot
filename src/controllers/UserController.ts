import { BadRequestError, NotFoundError } from "./../helpers/AppErrors";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

export class UserController {
  async index(req: Request, res: Response) {
    const users = await userRepository.find();
    return res.json(users);
  }

  async show(req: Request, res: Response) {
    const user = await userRepository.findOneBy({
      id: parseInt(req.params.id, 10),
    });

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    return res.json(user);
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
    const { name, email, apartment, password } = req.body;

    const user = await userRepository.findOneBy({
      id: parseInt(req.params.id, 10),
    });

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    userRepository.merge(user, { name, email, apartment, password });
    await userRepository.save(user);

    return res.json({ message: "Usuário atualizado com sucesso" });
  }

  async delete(req: Request, res: Response) {
    const user = await userRepository.findOneBy({
      id: parseInt(req.params.id, 10),
    });

    if (!user) {
      throw new BadRequestError("Usuário não encontrado");
    }

    await userRepository.remove(user);

    return res.json({ message: "Usuário removido com sucesso" });
  }
}
