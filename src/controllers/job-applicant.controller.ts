import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Job,
  Applicant,
} from '../models';
import {JobRepository} from '../repositories';

export class JobApplicantController {
  constructor(
    @repository(JobRepository) protected jobRepository: JobRepository,
  ) { }

  @get('/jobs/{id}/applicants', {
    responses: {
      '200': {
        description: 'Array of Job has many Applicant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Applicant)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Applicant>,
  ): Promise<Applicant[]> {
    return this.jobRepository.applicants(id).find(filter);
  }

  @post('/jobs/{id}/applicants', {
    responses: {
      '200': {
        description: 'Job model instance',
        content: {'application/json': {schema: getModelSchemaRef(Applicant)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Job.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Applicant, {
            title: 'NewApplicantInJob',
            exclude: ['id'],
            optional: ['jobId']
          }),
        },
      },
    }) applicant: Omit<Applicant, 'id'>,
  ): Promise<Applicant> {
    return this.jobRepository.applicants(id).create(applicant);
  }

  @patch('/jobs/{id}/applicants', {
    responses: {
      '200': {
        description: 'Job.Applicant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Applicant, {partial: true}),
        },
      },
    })
    applicant: Partial<Applicant>,
    @param.query.object('where', getWhereSchemaFor(Applicant)) where?: Where<Applicant>,
  ): Promise<Count> {
    return this.jobRepository.applicants(id).patch(applicant, where);
  }

  @del('/jobs/{id}/applicants', {
    responses: {
      '200': {
        description: 'Job.Applicant DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Applicant)) where?: Where<Applicant>,
  ): Promise<Count> {
    return this.jobRepository.applicants(id).delete(where);
  }
}
