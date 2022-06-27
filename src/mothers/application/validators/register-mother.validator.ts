import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PadresTypeORM } from "../../infrastructure/persistence/typeorm/entities/mother.typeorm";
import { Repository } from "typeorm";
import { RegisterPadresRequestDto } from "../dtos/request/register-mother-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { Result } from 'typescript-result';
import { Email } from '../../domain/value-objects/email.value';

@Injectable()
export class RegisterPadresValidator {
  constructor(
    @InjectRepository(PadresTypeORM)
    private padresRepository: Repository<PadresTypeORM>
  ) {}

  public async validate(
    registerPadresRequestDto: RegisterPadresRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const name: string = registerPadresRequestDto.name.trim();
    if (name.length <= 0) {
      notification.addError('Se requiere el nombre del padre', null);
    }
    const lastName: string = registerPadresRequestDto.lastName.trim();
    if (lastName.length <= 0) {
      notification.addError('Se requiere el apellido del padre', null);
    }

    const password: string = registerPadresRequestDto.password.trim();
    if (password.length <= 0) {
      notification.addError('Se requiere la contraseña del padre', null);
    }

    const email: string = registerPadresRequestDto.email.trim();
    const emailResult: Result<AppNotification, Email> = Email.create(email);

    if (emailResult.isFailure()) {
      notification.addErrors(emailResult.error.getErrors());
    }

    if(notification.hasErrors()) {
      return notification;
    }

    const padres: PadresTypeORM =
      await this.padresRepository.
      createQueryBuilder()
        .where("email = :email", {email})
        .getOne();

    if(padres != null) {
      notification.addError('Se toma el correo electronico del padre', null);
    }

    return notification;
  }
}