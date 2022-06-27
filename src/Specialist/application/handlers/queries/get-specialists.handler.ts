import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSpecialistsQuery } from '../../queries/get-specialists.query';
import { getManager } from 'typeorm';
import { GetSpecialistsDto } from '../../dtos/queries/get-specialists.dto';

@QueryHandler(GetSpecialistsQuery)
export class GetSpecialistsHandler implements IQueryHandler<GetSpecialistsQuery> {
  constructor() {}

  async execute(query: GetSpecialistsQuery) {
    const manager = getManager();

    const sql = `
    SELECT 
        id,
        name as name,
        last_name as lastName,
        age as age,
        email,
        password,
    FROM
        specialist
    ORDER BY
        id;  
    `;

    const ormSpecialists = await manager.query(sql);

    if (ormSpecialists.length <= 0) {
      return [];
    }

    const specialists: GetSpecialistsDto[] = ormSpecialists.map(function (
      ormSpecialists,
    ) {
      const specialistDto = new GetSpecialistsDto();
      specialistDto.id = Number(ormSpecialists.id);
      specialistDto.firstName = ormSpecialists.firstName;
      specialistDto.lastName = ormSpecialists.lastName;
      specialistDto.email = ormSpecialists.email;
      specialistDto.password = ormSpecialists.password;
      specialistDto.CNum = ormSpecialists.CNum;
      return specialistDto;
    });

    return specialists;
  }
}