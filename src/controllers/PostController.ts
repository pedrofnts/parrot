import { Request, Response } from "express";
import { NotFoundError } from "../helpers/AppErrors";
import { postRepository } from "../repositories/postRepository";
import { userRepository } from "../repositories/userRepository";

export class PostController {
  async index(req: Request, res: Response) {
    const posts = await postRepository.find({
      relations: { user: true },
      select: {
        user: {
          id: true,
          name: true,
          apartment: true,
        },
      },
    });
    return res.status(200).json(posts);
  }
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const post = await postRepository.findOneBy({ id: parseInt(id, 10) });

    if (!post) {
      throw new NotFoundError("Post não encontrado");
    }

    return res.status(200).json(post);
  }
  async create(req: Request, res: Response) {
    const { content } = req.body;
    const { id } = req.user;

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundError("Não autorizado");
    }

    const post = await postRepository.create({ content, user });
    await postRepository.save(post);
    return res.status(201).json("Post criado com sucesso!");
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    const post = await postRepository.findOneBy({ id: parseInt(id, 10) });

    if (!post) {
      throw new NotFoundError("Post não encontrado");
    }

    await postRepository.delete(post);
    return res.status(200).json("Post deletado com sucesso!");
  }
}
