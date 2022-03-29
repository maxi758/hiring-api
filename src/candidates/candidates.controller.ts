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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { ValidationGuard } from '../auth/guards/validate.guard';
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

  @ApiBearerAuth()
  @Get()
  @Roles('api-admin', 'company-admin', 'recruiter')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  findAll() {
    return this.candidatesService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @Roles('api-admin', 'company-admin', 'recruiter')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.candidatesService.findOne(id);
  }

  @ApiBearerAuth()
  @Get(':id/status')
  @Roles('api-admin', 'company-admin', 'recruiter')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  getStatus(@Param('id', ParseIntPipe) id: number) {
    return this.candidatesService.getStatus(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Roles('api-admin', 'company-admin', 'recruiter')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ) {
    return this.candidatesService.update(id, updateCandidateDto);
  }

  @ApiBearerAuth()
  @Patch(':id/status')
  @Roles('api-admin', 'company-admin', 'recruiter')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  @ApiQuery({ name: 'state', enum: StagesState })
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Query('state', new ParseEnumPipe(StagesState)) change: StagesState,
  ) {
    return this.candidatesService.changeStatus(id, change);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles('api-admin', 'company-admin', 'recruiter')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.candidatesService.remove(id);
  }
}
