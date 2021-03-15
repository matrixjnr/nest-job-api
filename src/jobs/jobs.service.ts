import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult, ObjectID } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Jobs } from './jobs.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Jobs)
    private jobRepository: Repository<Jobs>,
  ) {}
  async findAll(): Promise<Jobs[]> {
    return await this.jobRepository.find();
  }

  async findOne(id: ObjectID): Promise<Jobs> {
    return await this.jobRepository.findOne(id);
  }

  async create(job: Jobs): Promise<Jobs> {
    return await this.jobRepository.save(job);
  }

  async update(id, job: Partial<Jobs>): Promise<UpdateResult> {
    return await this.jobRepository.update(id, job);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.jobRepository.delete(id);
  }
}
