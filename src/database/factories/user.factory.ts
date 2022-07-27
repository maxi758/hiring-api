import { setSeederFactory } from 'typeorm-extension';
import { User } from './../../users/entities/user.entity';

export default setSeederFactory(User, (faker) => {
  const gender = faker.name.gender();
  const username = faker.name.firstName();
  const email = faker.internet.email(username);

  const user = new User();
  user.username = username;
  user.email = email;
  user.password = faker.random.word();
  return user;
});
