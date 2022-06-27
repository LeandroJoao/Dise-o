import { Email } from '../../../mothers/domain/value-objects/email.value';
import { Password } from '../../../common/domain/value-objects/password.value';
import { Specialist } from '../entities/specialist.entity';
import { CNum } from '../../../mothers/domain/value-objects/CNum.value';
import { SpecialistId } from '../value-objects/specialist-id.value';

export class SpecialistFactory {
  public static createFrom(
    firstName: string,
    lastName: string,
    email: Email,
    password: Password,
    CNum: CNum,
  ): Specialist {
    return new Specialist(
      SpecialistId.create(0),
      firstName,
      lastName,
      email,
      password,
      CNum,
    );
  }

  public static withId(
    specialistId: SpecialistId,
    firstName: string,
    lastName: string,
    email: Email,
    password: Password,
    CNum: CNum,
  ): Specialist {
    return new Specialist(
      specialistId,
      firstName,
      lastName,
      email,
      password,
      CNum,
    );
  }
}
