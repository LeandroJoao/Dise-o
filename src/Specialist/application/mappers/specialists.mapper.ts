import { Specialist } from '../../domain/entities/specialist.entity';
import { SpecialistTypeORM } from '../../infrastructure/persistence/typeorm/entities/specialists.typeorm';
import { SpecialistIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/specialists.id.typeorm';
import { PasswordTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/password.typeorm';
import { EmailTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { CNumTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/CNum.typeorm';

export class SpecialistsMapper {
  public static toTypeORM(specialists: Specialist): SpecialistTypeORM {
    const specialistsTypeORM: SpecialistTypeORM = new SpecialistTypeORM();

    specialistsTypeORM.id = SpecialistIdTypeORM.from(
      specialists.getId().getValue(),
    );
    specialistsTypeORM.firstName = specialists.getName();
    specialistsTypeORM.lastName = specialists.getLastName();
    specialistsTypeORM.email = EmailTypeORM.from(
      specialists.getEmail().getValue(),
    );
    specialistsTypeORM.password = PasswordTypeORM.from(
      specialists.getPassword().getValue(),
    );
    specialistsTypeORM.CNum = CNumTypeORM.from(specialists.getCNum().getCNum());
    return specialistsTypeORM;
  }
}
