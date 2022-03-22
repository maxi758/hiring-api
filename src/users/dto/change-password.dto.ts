import { IsNotEmpty, Length } from 'class-validator';

export class ChangePasswordDto {
  @Length(3, 16)
  password: string;
}
