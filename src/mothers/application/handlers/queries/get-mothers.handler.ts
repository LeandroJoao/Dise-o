import { getManager } from 'typeorm';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPadresQuery } from '../../queries/get-mothers.query';
import { GetPadresDto } from '../../dtos/queries/get-mothers.dto';

@QueryHandler(GetPadresQuery)
export class GetPadresHandler implements IQueryHandler<GetPadresQuery> {
  constructor() {}

  async execute(query: GetPadresQuery) {
    const manager = getManager();

    const sql = `
    SELECT 
        id,
        name as name,
        last_name as lastName,
        age as age,
        email,
        password
    FROM
        mothers
    ORDER BY
        id;  
    `;

    const ormPadres = await manager.query(sql);

    if (ormPadres.length <= 0) {
      return [];
    }

    const padres: GetPadresDto[] = ormPadres.map(function (
      ormPadres,
    ) {
      const padresDto = new GetPadresDto();
      padresDto.id = Number(ormPadres.id);
      padresDto.name = ormPadres.name;
      padresDto.lastName = ormPadres.lastName;
      padresDto.email = ormPadres.email;
      padresDto.password = ormPadres.password;
      return padresDto;
    });

    return padres;
  }
}