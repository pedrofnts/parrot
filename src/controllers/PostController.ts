import { Request, Response } from "express";
import { NotFoundError } from "../helpers/AppErrors";
import { postRepository } from "../repositories/postRepository";
import { userRepository } from "../repositories/userRepository";

export class PostController {
  async create(req: Request, res: Response) {
    const { content } = req.body;
    const { userId } = req.params;

    const user = await userRepository.findOneBy({ id: parseInt(userId, 10) });

    if (!user) {
      throw new NotFoundError("Não autorizado");
    }

    const post = await postRepository.create({ content, user });
    await postRepository.save(post);
    return res.status(201).json(post);
  }

  async delete(req: Request, res: Response) {
    const { userId } = req.params;

    const post = await postRepository.findOneBy({ id: parseInt(userId, 10) });

    if (!post) {
      throw new NotFoundError("Post não encontrado");
    }

    await postRepository.delete(post);
    return res.status(200).json("Post deletado com sucesso");
  }
}
