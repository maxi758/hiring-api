import { Length } from 'class-validator';

export class CreateCompanyDto {
  @Length(1, 100)
  name: string;
  @Length(1, 100)
  adress: string;
  @Length(1, 100)
  city: string;
  @Length(1, 100)
  country: string;
}
