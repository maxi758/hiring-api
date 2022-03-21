import { IsEmail } from "class-validator";
import { UserDto } from "./user.dto";

export class CreateUserDto extends UserDto{
  @IsEmail()
  email: string;
}
