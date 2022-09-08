import { Post } from "../infrastructure/database/entities/Post";
import { AppDataSource } from "../data-source";

export const postRepository = AppDataSource.getRepository(Post);
