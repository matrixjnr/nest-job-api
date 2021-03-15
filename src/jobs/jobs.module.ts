import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from './jobs.controller';
import { Jobs } from './jobs.entity';
import { JobsService } from './jobs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Jobs])],
  providers: [JobsService],
  controllers: [JobsController],
})
export class JobsModule {}
