import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpeningsService } from './openings.service';
import { CreateOpeningDto } from './dto/create-opening.dto';
import { UpdateOpeningDto } from './dto/update-opening.dto';

@Controller('openings')
export class OpeningsController {
  constructor(private readonly openingsService: OpeningsService) {}

  @Post()
  create(@Body() createOpeningDto: CreateOpeningDto) {
    return this.openingsService.create(createOpeningDto);
  }

  @Get()
  findAll() {
    return this.openingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.openingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpeningDto: UpdateOpeningDto) {
    return this.openingsService.update(+id, updateOpeningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.openingsService.remove(+id);
  }
}
