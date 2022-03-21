import { User } from '../../users/entities/user.entity';

export type UserPayload = Omit<User, 'password'>;
