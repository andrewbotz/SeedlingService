import {DefaultCrudRepository} from '@loopback/repository';
import {Applicant, ApplicantRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ApplicantRepository extends DefaultCrudRepository<
  Applicant,
  typeof Applicant.prototype.id,
  ApplicantRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Applicant, dataSource);
  }
}
