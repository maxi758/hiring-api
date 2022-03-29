import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  @ApiBody({ type: UserDto })
  @Post('/login')
  async login(@Body() user: UserDto): Promise<{ access_token: string }> {
    return this.authService.login(user);
  }
  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async signInWithGoogle() {}

  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  async signInWithGoogleRedirect(@Req() req) {
    return this.authService.signInWithGoogle(req);
  }
}
