import { IsNumberString } from 'class-validator';

export class ValidateIdDto {
  @IsNumberString()
  id: number;
}
