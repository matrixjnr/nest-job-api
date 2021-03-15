import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('jobs')
export class Jobs {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  job_title: string;

  @Column()
  company: string;

  @Column()
  location: string;

  @Column()
  salary: string;

  @Column()
  summary: string;

  @Column()
  post_date: string;

  @Column()
  link: string;

  @Column()
  description: string;

  @Column()
  new: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt?: Date;

  @Column()
  deletedAt?: Date;

  constructor(job?: Partial<Jobs>) {
    Object.assign(this, job);
  }
}
