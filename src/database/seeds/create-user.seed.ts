import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = await dataSource.getRepository(User);
    await repository.insert([
      {
        email: 'maxi758@gmail.com',
        username: 'maxi',
        password: '1234',
        role: {
          id: '1',
        },
      },
    ]);
  }
}
