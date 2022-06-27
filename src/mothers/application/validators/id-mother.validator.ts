import { Injectable } from '@nestjs/common';
import { PadresTypeORM } from '../../infrastructure/persistence/typeorm/entities/mother.typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from '../../../common/application/app.notification';

@Injectable()
export class IdPadresValidator {
  constructor(
    @InjectRepository(PadresTypeORM)
    private padresRepository: Repository<PadresTypeORM>,
  ) {}

  public async validate(id: number): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    if (id < 0) {
      notification.addError('La ID del padre debe ser un numero entero positivo', null,);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const padres: PadresTypeORM = await this.padresRepository.findOne(id);

    if (padres == null) {
      notification.addError(`No existe un padre con este ID: ${id}`, null);
    }

    return notification;
  }

}
