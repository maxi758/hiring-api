import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StagesState } from '../common/dto/enums/stage.enum';
import { PositionsService } from '../positions/positions.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    private positionsService: PositionsService,
  ) {}
  async create(createCandidateDto: CreateCandidateDto, positionId: number) {
    const position = await this.positionsService.findOne(positionId);
    if (!position) throw new NotFoundException('position not found');
    return this.candidateRepository.save({ ...createCandidateDto, position });
  }

  findAll(): Promise<Candidate[]> {
    return this.candidateRepository.find();
  }

  findOne(id: number): Promise<Candidate> {
    const candidate = this.candidateRepository.findOne(id);
    if (!candidate) throw new NotFoundException('candidate not found');
    return candidate;
  }

  async update(
    id: number,
    updateCandidateDto: UpdateCandidateDto,
  ): Promise<Candidate> {
    const candidateToUpdate = await this.findOne(id);
    if (!candidateToUpdate) throw new NotFoundException('candidate not found');
    return this.candidateRepository.save({
      ...candidateToUpdate,
      ...updateCandidateDto,
    });
  }
  async changeStatus(id: number, status: StagesState) {
    const candidateToUpdate = await this.findOne(id);
    if (!candidateToUpdate) throw new NotFoundException('candidate not found');
    candidateToUpdate.status = status;
    return this.candidateRepository.save(candidateToUpdate);
  }
  async getStatus(id: number): Promise<StagesState> {
    const candidate = await this.findOne(id);
    if (!candidate) throw new NotFoundException('candidate not found');
    return candidate.status;
  }
  remove(id: number) {
    return this.candidateRepository.delete(id);
  }
}
