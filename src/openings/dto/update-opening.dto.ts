import { PartialType } from '@nestjs/swagger';
import { CreateOpeningDto } from './create-opening.dto';

export class UpdateOpeningDto extends PartialType(CreateOpeningDto) {}
