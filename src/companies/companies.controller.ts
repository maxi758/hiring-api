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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { ValidationGuard } from '../auth/guards/validate.guard';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiBearerAuth()
  @Post()
  @Roles('api-admin')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @ApiBearerAuth()
  @Get()
  @Roles('api-admin')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  findAll() {
    return this.companiesService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @Roles('api-admin')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Roles('api-admin')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles('api-admin')
  @UseGuards(AuthGuard('jwt'), ValidationGuard, RoleGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.remove(id);
  }
}
