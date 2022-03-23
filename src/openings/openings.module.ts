import { Module } from '@nestjs/common';
import { OpeningsService } from './openings.service';
import { OpeningsController } from './openings.controller';

@Module({
  controllers: [OpeningsController],
  providers: [OpeningsService]
})
export class OpeningsModule {}
