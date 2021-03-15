import {
  Controller,
  NotFoundException,
  Get,
  Param,
  Post,
  Body,
  BadRequestException,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ObjectID } from 'typeorm';
import { Jobs } from './jobs.entity';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  async getJobs(): Promise<Jobs[]> {
    const jobArray = await this.jobsService.findAll();

    return jobArray.slice(Math.max(jobArray.length - 10, 0));
  }

  @Get()
  async getLatestJobs(): Promise<Jobs[]> {
    return await this.jobsService.findAll();
  }

  @Get(':id')
  async getJob(@Param('id') id): Promise<Jobs> {
    const job = ObjectID.isValid(id) && (await this.jobsService.findOne(id));
    if (!job) {
      // Entity not found
      throw new NotFoundException();
    }
    return job;
  }

  @Post()
  async createJob(@Body() job: Partial<Jobs>): Promise<Jobs> {
    if (!job || !job.company || !job.job_title || !job.link) {
      throw new BadRequestException(
        `A job posted must at least have company name, job title and application link`,
      );
    }
    return await this.jobsService.create(new Jobs(job));
  }

  @Put(':id')
  @HttpCode(204)
  async updateJob(@Param('id') id, @Body() job: Partial<Jobs>): Promise<void> {
    // Check if entity exists
    const exists = ObjectID.isValid(id) && (await this.jobsService.findOne(id));
    if (!exists) {
      throw new NotFoundException();
    }
    job.id = new ObjectID(id);
    await this.jobsService.update(id, job);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteJob(@Param('id') id): Promise<void> {
    // Check if entity exists
    const exists = ObjectID.isValid(id) && (await this.jobsService.findOne(id));
    if (!exists) {
      throw new NotFoundException();
    }
    await this.jobsService.delete(id);
  }
}
