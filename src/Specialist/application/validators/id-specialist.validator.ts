import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialistTypeORM } from '../../infrastructure/persistence/typeorm/entities/specialist.typeorm';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../common/application/app.notification';

@Injectable()
export class IdSpecialistValidator {
  constructor(
    @InjectRepository(SpecialistTypeORM)
    private specialistRepository: Repository<SpecialistTypeORM>,
  ) {}

  public async validate(id: number): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    if (id < 0) {
      notification.addError('The specialist id must be a positive integer', null,);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const specialist: SpecialistTypeORM = await this.specialistRepository.findOne(id);

    if (specialist == null) {
      notification.addError(`There is no specialist with id: ${id}`, null);
    }

    return notification;
  }

}