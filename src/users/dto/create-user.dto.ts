import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;
}
