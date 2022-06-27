import { PadresTypeORM } from '../../infrastructure/persistence/typeorm/entities/mother.typeorm';
import { Padres } from '../../domain/entities/mother.entity';
import { PadresIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/mother.id.typeorm';
import { EmailTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { PasswordTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/password.typeorm';

export class PadresMapper {
  public static toTypeORM(padres: Padres): PadresTypeORM {
    const padresTypeORM: PadresTypeORM = new PadresTypeORM();

    padresTypeORM.id = PadresIdTypeORM.from(padres.getId().getValue());
    padresTypeORM.name = padres.getName();
    padresTypeORM.lastName = padres.getLastName();
    padresTypeORM.email = EmailTypeORM.from(padres.getEmail().getValue());
      (padresTypeORM.password = PasswordTypeORM.from(
          padres.getPassword().getValue(),
      ));
    return padresTypeORM;
  }
}
