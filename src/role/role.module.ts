import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), UsersModule, AuthModule],
  exports: [TypeOrmModule],
})
export class RoleModule {}
