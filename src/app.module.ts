import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { CandidateModule } from './candidate/candidate.module';

@Module({
  imports: [CompanyModule, AuthModule, CandidateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
