import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PadresTypeORM } from '../../infrastructure/persistence/typeorm/entities/mother.typeorm';
import { Email } from '../../domain/value-objects/email.value';
import { AppNotification } from '../../../common/application/app.notification';
import { Password } from '../../../common/domain/value-objects/password.value';
import { Result } from 'typescript-result';
import { UpdatePadresRequestDto } from '../dtos/request/update-mother-request.dto';

@Injectable()
export class UpdatePadresValidator {
  constructor(
    @InjectRepository(PadresTypeORM)
    private PadresRepository: Repository<PadresTypeORM>,
  ) {}

  public async validate(
    targetId: number,
    updatePadresRequestDto: UpdatePadresRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const id: number = updatePadresRequestDto.id;

    if (id == null) {
      notification.addError('Se requiere identificacion del padre', null);
    }

    const name: string = updatePadresRequestDto.name.trim();
    if (name.length <= 0) {
      notification.addError('Se requiere el nombre del padre', null);
    }

    const lastname: string = updatePadresRequestDto.lastName.trim();
    if (lastname.length <= 0) {
      notification.addError('Se requiere el apellido del padre', null);
    }

    const email: string = updatePadresRequestDto.email.trim();

    if (email.length <= 0) {
      notification.addError('Se requiere el email del padre', null);
    }

    const password: string = updatePadresRequestDto.password.trim();

    if (password.length <= 0) {
      notification.addError('Se requiere la contrase', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const emailResult: Result<AppNotification, Email> = Email.create(email);

    if (emailResult.isFailure()) {
      notification.addErrors(emailResult.error.getErrors());
    }

    const passwordResult: Result<AppNotification, Password> =
      Password.create(password);

    if (passwordResult.isFailure()) {
      notification.addErrors(passwordResult.error.getErrors());
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const padres:PadresTypeORM = await this.PadresRepository.findOne(targetId);

    let otherPadres: PadresTypeORM = await this.PadresRepository.findOne(id);

    if (otherPadres != null && otherPadres.id.value !== padres.id.value) {
      notification.addError(`Ya existe un padre con este ID: ${id}`, null);
    }

    otherPadres = await this.PadresRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();

    if (padres != null && otherPadres.email.value !== padres.email.value) {
      notification.addError('Se tomo el correo electronico del padre', null);
    }

    return notification;
  }
}
