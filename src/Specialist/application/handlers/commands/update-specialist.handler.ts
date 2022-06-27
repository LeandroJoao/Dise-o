import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSpecialistCommand } from '../../commands/update-specialist.command';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialistTypeORM } from '../../../infrastructure/persistence/typeorm/entities/specialist.typeorm';
import { Repository } from 'typeorm';
import { SpecialistId } from '../../../domain/value-objects/specialist-id.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { Email } from '../../../../mothers/domain/value-objects/email.value';
import { Password } from '../../../../common/domain/value-objects/password.value';
import { CNum } from '../../../../mothers/domain/value-objects/CNum.value';
import { SpecialistFactory } from '../../../domain/factories/specialist.factory';
import { Specialist } from '../../../domain/entities/specialist.entity';
import { SpecialistMapper } from '../../mappers/specialist.mapper';

@CommandHandler(UpdateSpecialistCommand)
export class UpdateSpecialistHandler
  implements ICommandHandler<UpdateSpecialistCommand>
{
  constructor(
    @InjectRepository(SpecialistTypeORM)
    private specialistRepository: Repository<SpecialistTypeORM>,
  ) {}

  async execute(command: UpdateSpecialistCommand) {
    const idResult: SpecialistId = SpecialistId.create(command.id);

    const emailResult: Result<AppNotification, Email> = Email.create(command.email);
    if (emailResult.isFailure()) {
      return null;
    }

    const passwordResult: Result<AppNotification, Password> = Password.create(
      command.password,
    );

    if (passwordResult.isFailure()) {
      return null;
    }

    const CNumResult: Result<AppNotification, CNum> = CNum.create(
      command.CNum,
    );

    if (CNumResult.isFailure()) {
      return null;
    }

    const mother:Specialist = SpecialistFactory.withId(
      idResult,
      command.firstName,
      command.lastName,
      emailResult.value,
      passwordResult.value,
      CNumResult.value,
    );

    const specialistTypeORM = SpecialistMapper.toTypeORM(mother);
    await this.specialistRepository.update(command.targetId, specialistTypeORM);

    return specialistTypeORM;
  }
}
