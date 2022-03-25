import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesService } from '../companies/companies.service';
import { Company } from '../companies/entities/company.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
    private companiesService: CompaniesService,
  ) {}
  async create(createPositionDto: CreatePositionDto, companyId: number) {
    const company = await this.companiesService.findOne(companyId);
    if (!company) throw new NotFoundException('resource not found');
    return this.positionRepository.save({ ...createPositionDto, company });
  }

  findAll(companyId: number): Promise<Position[]> {
    return this.positionRepository.find({ company: { id: companyId } });
  }

  findOne(id: number) {
    const position = this.positionRepository.findOne(id);
    if (!position) throw new NotFoundException('position not found');
    return position;
  }

  update(id: number, updatePositionDto: UpdatePositionDto) {
    const position = this.positionRepository.findOne(id);
    if (!position) throw new NotFoundException('position not found');
    return this.positionRepository.save({ ...position, ...updatePositionDto });
  }

  remove(id: number) {
    return this.positionRepository.delete(id);
  }
}
