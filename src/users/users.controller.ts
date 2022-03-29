import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ValidationGuard } from '../auth//guards/validate.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/guards/role.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeRoleDto } from './dto/change-role.dto';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth()
  @Get('/')
  @UseGuards(ValidationGuard)
  getAll() {
    return this.usersService.getUsers();
  }

  @ApiBearerAuth()
  @Get('/:id')
  @UseGuards(ValidationGuard)
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @ApiBearerAuth()
  @Patch('/:id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @ApiBearerAuth()
  @Patch('/:id/role')
  @Roles('api-admin')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  changeRole(
    @Body() changeRoleDto: ChangeRoleDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.changeRole(id, changeRoleDto.role);
  }

  @ApiBearerAuth()
  @Post('/admin')
  @Roles('api-admin')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createAdmin(createUserDto);
  }

  @ApiBearerAuth()
  @Patch('/password/change')
  @UseGuards(AuthGuard('jwt'), ValidationGuard)
  changePassword(
    @Req() request: Request,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(
      changePasswordDto.password,
      request,
    );
  }

  @Post('password/reset')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto): void {
    this.usersService.resetPassword(resetPasswordDto.email);
  }

  @ApiBearerAuth()
  @Delete('/:id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    this.usersService.removeUser(id);
  }
}
