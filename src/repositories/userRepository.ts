import { User } from "../infrastructure/database/entities/User";
import { AppDataSource } from "../data-source";

export const userRepository = AppDataSource.getRepository(User);
