import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { Post } from '../entities/Post'
import { User } from '../entities/User'

export class PostSeeder implements Seeder {
	async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<void> {
		const postRepository = dataSource.getRepository(Post)
		const userRepository = dataSource.getRepository(User)

		let content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc egestas tristique turpis eu interdum. Proin rutrum cursus rhoncus. Cras gravida vel nisl in malesuada."

        const userSeed = await userRepository.findOneBy({id: Number(1)})

		if (userSeed) {
			const newPost = postRepository.create({
				content,
				user: userSeed
			})
	
			await postRepository.save(newPost)
		}	
	}
}