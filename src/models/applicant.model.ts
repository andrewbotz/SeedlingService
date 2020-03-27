import {Entity, model, property} from '@loopback/repository';

@model()
export class Applicant extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'number',
  })
  phone?: number;

  @property({
    type: 'string',
  })
  reasonForInterest?: string;

  @property({
    type: 'number',
  })
  jobId?: number;

  constructor(data?: Partial<Applicant>) {
    super(data);
  }
}

export interface ApplicantRelations {
  // describe navigational properties here
}

export type ApplicantWithRelations = Applicant & ApplicantRelations;
