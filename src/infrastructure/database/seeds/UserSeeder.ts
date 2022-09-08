import bcrypt from "bcrypt";
import { userRepository } from "../../../repositories/userRepository";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "../entities/User";

export class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const userData = {
      name: "Pedro Fontes",
      email: "pedro7fontes@gmail.com",
      apartment: 2,
      password: await bcrypt.hash("123456", 10),
    };

    const userExists = await userRepository.findOneBy({
      email: userData.email,
    });

    if (!userExists) {
      const newUser = userRepository.create(userData);
      await userRepository.save(newUser);
    }
  }
}
