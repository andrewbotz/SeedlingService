import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Applicant} from './applicant.model';
import {Organization} from './organization.model';

@model()
export class Job extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'date',
  })
  datePosted?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
  })
  responsibilities?: string;

  @property({
    type: 'string',
  })
  desiredExperience?: string;

  @property({
    type: 'string',
  })
  benefits?: string;

  @property({
    type: 'string',
  })
  state?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @hasOne(() => Organization)
  organization: Organization;

  @hasMany(() => Applicant)
  applicants: Applicant[];

  constructor(data?: Partial<Job>) {
    super(data);
  }
}

export interface JobRelations {
  // describe navigational properties here
}

export type JobWithRelations = Job & JobRelations;
