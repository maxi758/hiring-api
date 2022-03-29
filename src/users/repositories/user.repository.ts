import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '../../roles/entities/role.entity';
import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUsers(): Promise<User[]> {
    const users = await this.find();
    if (!users) throw new HttpException('No results found', 204);
    return users;
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.findOne(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async createUser(createUserDto: CreateUserDto, role: Role): Promise<User> {
    const { username } = createUserDto;
    const userExist = await this.findOne({
      where: { username },
    });
    if (userExist) {
      throw new BadRequestException('User already exists');
    }
    const newUser = await this.save({ ...createUserDto, role });
    return newUser;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const userToUpdate = await this.findOne(userId);
    return this.save({ ...userToUpdate, ...updateUserDto });
  }

  async changePassword(id: number, newPassword: string): Promise<UpdateResult> {
    //will check if user exists
    await this.getUserById(id);

    return this.update(id, { password: newPassword });
  }

  async removeUser(userId: number): Promise<DeleteResult> {
    return this.delete(userId);
  }
  async findOneUserBy(criteria: any): Promise<User | undefined> {
    return this.findOne(criteria);
  }
}
