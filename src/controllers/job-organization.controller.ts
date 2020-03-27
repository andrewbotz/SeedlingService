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
  Organization,
} from '../models';
import {JobRepository} from '../repositories';

export class JobOrganizationController {
  constructor(
    @repository(JobRepository) protected jobRepository: JobRepository,
  ) { }

  @get('/jobs/{id}/organization', {
    responses: {
      '200': {
        description: 'Job has one Organization',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Organization),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Organization>,
  ): Promise<Organization> {
    return this.jobRepository.organization(id).get(filter);
  }

  @post('/jobs/{id}/organization', {
    responses: {
      '200': {
        description: 'Job model instance',
        content: {'application/json': {schema: getModelSchemaRef(Organization)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Job.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Organization, {
            title: 'NewOrganizationInJob',
            exclude: ['id'],
            optional: ['jobId']
          }),
        },
      },
    }) organization: Omit<Organization, 'id'>,
  ): Promise<Organization> {
    return this.jobRepository.organization(id).create(organization);
  }

  @patch('/jobs/{id}/organization', {
    responses: {
      '200': {
        description: 'Job.Organization PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Organization, {partial: true}),
        },
      },
    })
    organization: Partial<Organization>,
    @param.query.object('where', getWhereSchemaFor(Organization)) where?: Where<Organization>,
  ): Promise<Count> {
    return this.jobRepository.organization(id).patch(organization, where);
  }

  @del('/jobs/{id}/organization', {
    responses: {
      '200': {
        description: 'Job.Organization DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Organization)) where?: Where<Organization>,
  ): Promise<Count> {
    return this.jobRepository.organization(id).delete(where);
  }
}
