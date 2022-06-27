import { Specialist } from '../../domain/entities/specialist.entity';
import { SpecialistTypeORM } from '../../infrastructure/persistence/typeorm/entities/specialist.typeorm';
import { SpecialistIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/specialist.id.typeorm';
import { PasswordTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/password.typeorm';
import { EmailTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { CNumTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/CNum.typeorm';

export class SpecialistMapper {
  public static toTypeORM(specialist: Specialist): SpecialistTypeORM {
    const specialistTypeORM: SpecialistTypeORM = new SpecialistTypeORM();

    specialistTypeORM.id = SpecialistIdTypeORM.from(
      specialist.getId().getValue(),
    );
    specialistTypeORM.firstName = specialist.getName();
    specialistTypeORM.lastName = specialist.getLastName();
    specialistTypeORM.email = EmailTypeORM.from(
      specialist.getEmail().getValue(),
    );
    specialistTypeORM.password = PasswordTypeORM.from(
      specialist.getPassword().getValue(),
    );
    specialistTypeORM.CNum = CNumTypeORM.from(specialist.getCNum().getCNum());
    return specialistTypeORM;
  }
}
