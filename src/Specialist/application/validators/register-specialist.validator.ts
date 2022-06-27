import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecialistTypeORM } from '../../infrastructure/persistence/typeorm/entities/specialist.typeorm';
import { RegisterSpecialistRequestDto } from '../dtos/request/register-specialist-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { Result } from 'typescript-result';
import { Email } from '../../../mothers/domain/value-objects/email.value';

@Injectable()
export class RegisterSpecialistValidator {
  constructor(
    @InjectRepository(SpecialistTypeORM)
    private specialistRepository: Repository<SpecialistTypeORM>
  ) {}

  public async validate(
    registerSpecialistRequestDto: RegisterSpecialistRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const name: string = registerSpecialistRequestDto.firstName.trim();
    if (name.length <= 0) {
      notification.addError('Specialist name is required', null);
    }
    const lastName: string = registerSpecialistRequestDto.lastName.trim();
    if (lastName.length <= 0) {
      notification.addError('Specialist lastName is required', null);
    }

    const password: string = registerSpecialistRequestDto.password.trim();
    if (password.length <= 0) {
      notification.addError('Specialist password is required', null);
    }

    const email: string = registerSpecialistRequestDto.email.trim();
    const emailResult: Result<AppNotification, Email> = Email.create(email);

    if (emailResult.isFailure()) {
      notification.addErrors(emailResult.error.getErrors());
    }

    const CNum: number = registerSpecialistRequestDto.CNum;
    if (CNum <= 9999) {
      notification.addError('CNum is not valid', null);
    }

    if(notification.hasErrors()) {
      return notification;
    }

    const specialist: SpecialistTypeORM =
      await this.specialistRepository.
      createQueryBuilder()
        .where("email = :email", {email})
        .getOne();

    if(specialist != null) {
      notification.addError('Specialist email is taken', null);
    }

    return notification;
  }
}