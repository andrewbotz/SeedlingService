import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {Job, JobRelations, Organization, Applicant} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrganizationRepository} from './organization.repository';
import {ApplicantRepository} from './applicant.repository';

export class JobRepository extends DefaultCrudRepository<
  Job,
  typeof Job.prototype.id,
  JobRelations
> {

  public readonly organization: HasOneRepositoryFactory<Organization, typeof Job.prototype.id>;

  public readonly applicants: HasManyRepositoryFactory<Applicant, typeof Job.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('OrganizationRepository') protected organizationRepositoryGetter: Getter<OrganizationRepository>, @repository.getter('ApplicantRepository') protected applicantRepositoryGetter: Getter<ApplicantRepository>,
  ) {
    super(Job, dataSource);
    this.applicants = this.createHasManyRepositoryFactoryFor('applicants', applicantRepositoryGetter,);
    this.registerInclusionResolver('applicants', this.applicants.inclusionResolver);
    this.organization = this.createHasOneRepositoryFactoryFor('organization', organizationRepositoryGetter);
    this.registerInclusionResolver('organization', this.organization.inclusionResolver);
  }
}
