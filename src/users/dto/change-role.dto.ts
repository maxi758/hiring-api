import { Length } from 'class-validator';

export class ChangeRoleDto {
  @Length(5, 6)
  role: string;
}
