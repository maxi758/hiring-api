import { Length } from 'class-validator';

export class CreatePositionDto {
  @Length(1, 100)
  name: string;
  @Length(1, 50)
  employmentType: string;
  @Length(1, 50)
  experienceLevel: string;
  @Length(1, 250)
  description: string;
}
