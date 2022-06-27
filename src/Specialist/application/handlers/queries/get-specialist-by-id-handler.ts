import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSpecialistByIdQuery } from '../../queries/get-specialist-by-id.query';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialistTypeORM } from '../../../infrastructure/persistence/typeorm/entities/specialist.typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetSpecialistByIdQuery)
export class GetSpecialistByIdHandler
  implements IQueryHandler<GetSpecialistByIdQuery>
{
  constructor(
    @InjectRepository(SpecialistTypeORM)
    private specialistRepository: Repository<SpecialistTypeORM>,
  ) {}

  async execute(query: GetSpecialistByIdQuery) {
    const id = query.id;

    const specialist: SpecialistTypeORM = await this.specialistRepository.findOne(
      id,
    );

    return specialist;
  }
}