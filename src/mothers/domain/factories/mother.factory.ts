import { Email } from '../value-objects/email.value';
import { Padres } from '../entities/mother.entity';
import { PadresId } from '../value-objects/mother-id.value';
import { Password } from '../../../common/domain/value-objects/password.value';

export class PadresFactory {
  public static createFrom(
    name: string,
    lastName: string,
    email: Email,
    password: Password
  ): Padres {
      return new Padres(
      PadresId.create(0),
      name,
      lastName,
      email,
      password);
  }

  public static withId(padresId: PadresId, name: string, lastName: string, email: Email, password: Password): Padres {
    return new Padres(padresId, name, lastName, email, password);
  }
}