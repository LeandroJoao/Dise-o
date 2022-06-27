import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetPadresByIdQuery } from '../../queries/get-mother-by-id.query';
import { PadresTypeORM } from '../../../infrastructure/persistence/typeorm/entities/mother.typeorm';

@QueryHandler(GetPadresByIdQuery)
export class GetMotherByIdHandler
  implements IQueryHandler<GetPadresByIdQuery>
{
  constructor(
    @InjectRepository(PadresTypeORM)
    private padresRepository: Repository<PadresTypeORM>,
  ) {}

  async execute(query: GetPadresByIdQuery) {
    const id = query.id;

    const mother: PadresTypeORM = await this.padresRepository.findOne(
      id,
    );

    return mother;
  }
}