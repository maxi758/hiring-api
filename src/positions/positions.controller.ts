import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ValidationGuard } from '../auth/guards/validate.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@ApiTags('positions')
@Controller('companies/:companyId/positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @ApiBearerAuth()
  @Post()
  @Roles('api-admin', 'company-admin')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  create(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Body() createPositionDto: CreatePositionDto,
  ) {
    return this.positionsService.create(createPositionDto, companyId);
  }

  @ApiBearerAuth()
  @Get()
  @Roles('api-admin', 'company-admin')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  findAll(@Param('companyId', ParseIntPipe) companyId: number) {
    return this.positionsService.findAll(companyId);
  }

  @ApiBearerAuth()
  @Get(':id')
  @Roles('api-admin', 'company-admin')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.positionsService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Roles('api-admin', 'company-admin')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionsService.update(id, updatePositionDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles('api-admin', 'company-admin')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.positionsService.remove(id);
  }
}
