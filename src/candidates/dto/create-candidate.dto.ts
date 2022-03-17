import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateCandidateDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  surname: string;
  @IsEmail()
  email: string;
}
