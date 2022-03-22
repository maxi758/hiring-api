import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { Role } from '../roles/entities/role.entity';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserRepository, Role]),
    EmailModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
