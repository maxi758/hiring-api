import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { CandidateModule } from './candidate/candidate.module';
import { RecruiterModule } from './recruiter/recruiter.module';

@Module({
  imports: [CompanyModule, AuthModule, CandidateModule, RecruiterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
