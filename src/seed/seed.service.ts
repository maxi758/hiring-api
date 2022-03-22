import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRepository } from '../users/repositories/user.repository';
import { RoleRepository } from '../roles/repositories/role.repository';
import { Roles } from './constants/roles.constant';
import { seedUsers } from './constants/seed-users.constant';
import { In } from 'typeorm';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async onModuleInit(): Promise<void> {
    const users = await this.userRepository.find({
      where: { email: In(seedUsers.map(u => u.email)) },
    });

    if (!(users.length === 2)) {
      const roles = await this.roleRepository.seedRoles(Roles);

      this.userRepository.save(
        seedUsers.map(user => ({
          ...user,
          password: user.password,
          role: roles.filter(role => role.name === user.role)[0],
        })),
      );
    }
  }
}
