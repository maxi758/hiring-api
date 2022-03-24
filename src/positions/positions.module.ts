import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from '../companies/companies.module';
import { Position } from './entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Position]), CompaniesModule],
  controllers: [PositionsController],
  providers: [PositionsService],
})
export class PositionsModule {}
