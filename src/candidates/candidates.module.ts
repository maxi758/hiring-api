import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { PositionsModule } from '../positions/positions.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate]),
    PositionsModule,
    EmailModule,
  ],
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class CandidatesModule {}
