/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}
  create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepository.save(createCompanyDto);
  }

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({where: {id}});
    if (!company) throw new NotFoundException('company not found');
    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const companyToUpdate = await this.companyRepository.findOne({where:{id}});
    if (!companyToUpdate) throw new NotFoundException('company not found');
    return this.companyRepository.save({...companyToUpdate, ...updateCompanyDto});
  }

  remove(id: number) {
    return this.companyRepository.delete(id);
  }
}
