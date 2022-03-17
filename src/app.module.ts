import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CandidatesModule } from './candidates/candidates.module';
import { RecruitersModule } from './recruiters/recruiters.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [AuthModule, CandidatesModule, RecruitersModule, CompaniesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
