import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
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
import { ValidateIdDto } from '../common/dto/validate-id';
//import { ChangeRoleDto } from './dto/change-role.dto';
import { Roles } from '../auth/decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/guards/role.guard';
import { ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('user')
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
  @ApiParam({ name: 'id' })
  getUserById(@Param() param: ValidateIdDto) {
    return this.usersService.getUserById(param.id);
  }

  @ApiBearerAuth()
  @Patch('/:id')
  @UseGuards(ValidationGuard)
  @ApiParam({ name: 'id' })
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param() param: ValidateIdDto,
  ) {
    return this.usersService.updateUser(param.id, updateUserDto);
  }

  /*@ApiBearerAuth()
  @Patch('/:id/role')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  @ApiParam({ name: 'id' })
  changeRole(
    @Body() changeRoleDto: ChangeRoleDto,
    @Param() param: ValidateIdDto,
  ) {
    return this.usersService.changeRole(param.id, changeRoleDto.role);
  }
*/
  @ApiBearerAuth()
  @Patch('/password/change')
  @UseGuards(AuthGuard('jwt'), ValidationGuard)
  changePassword(
    @Req() request: Request,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(changePasswordDto.password, request);
  }

  @Post('password/reset')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto): void {
    this.usersService.resetPassword(resetPasswordDto.email);
  }

  @ApiBearerAuth()
  @Delete('/:id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  @ApiParam({ name: 'id' })
  deleteUser(@Param() param: ValidateIdDto) {
    this.usersService.removeUser(param.id);
  }
}
