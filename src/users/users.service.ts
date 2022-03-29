import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Request } from 'express';
import { UserRepository } from './repositories/user.repository';
import { AuthService } from '../auth/auth.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private emailService: EmailService,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  async getUserById(userId: number): Promise<User> {
    return this.userRepository.getUserById(userId);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const role = await this.roleRepository.findOne({ name: 'recruiter' });
    return this.userRepository.createUser(createUserDto, role);
  }

  async createAdmin(createUserDto: CreateUserDto): Promise<User> {
    const role = await this.roleRepository.findOne({ name: 'admin' });
    return this.userRepository.createUser(createUserDto, role);
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userRepository.updateUser(userId, updateUserDto);
  }

  async changePassword(
    password: string,
    request: Request,
  ): Promise<UpdateResult> {
    const userLoggedIn = this.authService.verifyToken(request);
    return this.userRepository.changePassword(userLoggedIn.sub, password);
  }

  async resetPassword(email: string) {
    const user = await this.userRepository.findOne({ email: email }); //think in a jtw approch later
    const provisionalPassword = randomStringGenerator();
    if (!user)
      throw new BadRequestException(`There is no user with email: ${email}`);
    //this.emailService.sendResetPasswordEmail(email, provisionalPassword);
    return this.userRepository.changePassword(user.id, provisionalPassword);
  }
  async removeUser(userId: number): Promise<DeleteResult> {
    return this.userRepository.removeUser(userId);
  }

  async findOneUser(criteria: any): Promise<User | undefined> {
    return this.userRepository.findOneUserBy(criteria);
  }

  async changeRole(userId: number, roleName: string): Promise<User> {
    const user = await this.userRepository.getUserById(userId);

    const role = await this.roleRepository.findOne({ name: roleName });

    return this.userRepository.save({ ...user, role });
  }
}
