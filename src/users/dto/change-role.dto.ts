import { Length } from 'class-validator';

export class ChangeRoleDto {
  @Length(5, 16)
  role: string;
}
