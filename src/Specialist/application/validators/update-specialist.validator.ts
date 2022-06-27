import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialistTypeORM } from '../../infrastructure/persistence/typeorm/entities/specialist.typeorm';
import { Repository } from 'typeorm';
import { UpdateSpecialistRequestDto } from '../dtos/request/update-specialist-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { Result } from 'typescript-result';
import { Email } from '../../../mothers/domain/value-objects/email.value';
import { Password } from '../../../common/domain/value-objects/password.value';

@Injectable()
export class UpdateSpecialistValidator {
  constructor(
    @InjectRepository(SpecialistTypeORM)
    private specialistRepository: Repository<SpecialistTypeORM>,
  ) {}

  public async validate(
    targetId: number,
    updatespecialistRequestDto: UpdateSpecialistRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const id: number = updatespecialistRequestDto.id;

    if (id == null) {
      notification.addError('Specialist id is required', null);
    }

    const name: string = updatespecialistRequestDto.firstName.trim();
    if (name.length <= 0) {
      notification.addError('Specialist name is required', null);
    }

    const lastname: string = updatespecialistRequestDto.lastName.trim();
    if (lastname.length <= 0) {
      notification.addError('Specialist lastname is required', null);
    }

    const email: string = updatespecialistRequestDto.email.trim();

    if (email.length <= 0) {
      notification.addError('Specialist email is required', null);
    }

    const password: string = updatespecialistRequestDto.password.trim();

    if (password.length <= 0) {
      notification.addError('Specialist password is required', null);
    }

    const CNum: number = updatespecialistRequestDto.CNum;

    if (CNum == null) {
      notification.addError('Specialist college number is required', null);
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

    const specialist: SpecialistTypeORM = await this.specialistRepository.findOne(targetId);

    let otherSpecialist: SpecialistTypeORM = await this.specialistRepository.findOne(id);

    if (otherSpecialist != null && otherSpecialist.id.value !== specialist.id.value) {
      notification.addError(`There is already an specialist with id: ${id}`, null);
    }

    otherSpecialist = await this.specialistRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();

    if (specialist != null && otherSpecialist.email.value !== specialist.email.value) {
      notification.addError('Specialist email is taken', null);
    }

    return notification;
  }
}
