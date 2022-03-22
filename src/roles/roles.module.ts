import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { RoleRepository } from './repositories/role.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleRepository]),
    UsersModule,
    AuthModule,
  ],
  exports: [TypeOrmModule],
})
export class RolesModule {}
