import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseEnumPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StagesState } from '../common/dto/enums/stage.enum';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';

@ApiTags('candidates')
@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @ApiBody({ type: CreateCandidateDto })
  @Post(':positionId/apply')
  create(
    @Param('positionId', ParseIntPipe) positionId: number,
    @Body() createCandidateDto: CreateCandidateDto,
  ): Promise<Candidate> {
    return this.candidatesService.create(createCandidateDto, positionId);
  }

  @Get()
  findAll() {
    return this.candidatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.candidatesService.findOne(id);
  }

  @Get(':id/status')
  getStatus(@Param('id', ParseIntPipe) id: number) {
    return this.candidatesService.getStatus(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ) {
    return this.candidatesService.update(id, updateCandidateDto);
  }

  @Patch(':id/status')
  @ApiQuery({ name: 'state', enum: StagesState })
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Query('state', new ParseEnumPipe(StagesState)) change: StagesState,
  ) {
    return this.candidatesService.changeStatus(id, change);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.candidatesService.remove(id);
  }
}
