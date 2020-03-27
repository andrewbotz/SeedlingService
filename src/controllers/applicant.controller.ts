import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Applicant} from '../models';
import {ApplicantRepository} from '../repositories';

export class ApplicantController {
  constructor(
    @repository(ApplicantRepository)
    public applicantRepository: ApplicantRepository,
  ) {}

  @post('/applicants', {
    responses: {
      '200': {
        description: 'Applicant model instance',
        content: {'application/json': {schema: getModelSchemaRef(Applicant)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Applicant, {
            title: 'NewApplicant',
            exclude: ['id'],
          }),
        },
      },
    })
    applicant: Omit<Applicant, 'id'>,
  ): Promise<Applicant> {
    return this.applicantRepository.create(applicant);
  }

  @get('/applicants/count', {
    responses: {
      '200': {
        description: 'Applicant model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Applicant) where?: Where<Applicant>,
  ): Promise<Count> {
    return this.applicantRepository.count(where);
  }

  @get('/applicants', {
    responses: {
      '200': {
        description: 'Array of Applicant model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Applicant, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Applicant) filter?: Filter<Applicant>,
  ): Promise<Applicant[]> {
    return this.applicantRepository.find(filter);
  }

  @patch('/applicants', {
    responses: {
      '200': {
        description: 'Applicant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Applicant, {partial: true}),
        },
      },
    })
    applicant: Applicant,
    @param.where(Applicant) where?: Where<Applicant>,
  ): Promise<Count> {
    return this.applicantRepository.updateAll(applicant, where);
  }

  @get('/applicants/{id}', {
    responses: {
      '200': {
        description: 'Applicant model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Applicant, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Applicant, {exclude: 'where'})
    filter?: FilterExcludingWhere<Applicant>,
  ): Promise<Applicant> {
    return this.applicantRepository.findById(id, filter);
  }

  @patch('/applicants/{id}', {
    responses: {
      '204': {
        description: 'Applicant PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Applicant, {partial: true}),
        },
      },
    })
    applicant: Applicant,
  ): Promise<void> {
    await this.applicantRepository.updateById(id, applicant);
  }

  @put('/applicants/{id}', {
    responses: {
      '204': {
        description: 'Applicant PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() applicant: Applicant,
  ): Promise<void> {
    await this.applicantRepository.replaceById(id, applicant);
  }

  @del('/applicants/{id}', {
    responses: {
      '204': {
        description: 'Applicant DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.applicantRepository.deleteById(id);
  }
}
