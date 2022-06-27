import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterSpecialistCommand } from '../../commands/register-specialist.command';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialistTypeORM } from '../../../infrastructure/persistence/typeorm/entities/specialist.typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { Email } from '../../../../mothers/domain/value-objects/email.value';
import { Password } from '../../../../common/domain/value-objects/password.value';
import { CNum } from '../../../../mothers/domain/value-objects/CNum.value';
import { SpecialistFactory } from '../../../domain/factories/specialist.factory';
import { Specialist } from '../../../domain/entities/specialist.entity';
import { SpecialistMapper } from '../../mappers/specialist.mapper';
import { SpecialistId } from '../../../domain/value-objects/specialist-id.value';

@CommandHandler(RegisterSpecialistCommand)
export class RegisterSpecialistHandler
  implements ICommandHandler<RegisterSpecialistCommand> {
  constructor(
    @InjectRepository(SpecialistTypeORM)
    private specialistRepository: Repository<SpecialistTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterSpecialistCommand) {
    const emailResult: Result<AppNotification, Email> = Email.create(command.email);
    if (emailResult.isFailure()) {
      return 0;
    }

    const passwordResult: Result<AppNotification, Password> = Password.create(
      command.password,
    );
    if (passwordResult.isFailure()) {
      return 0;
    }

    console.log(`${passwordResult.value}`);

    const CNumResult: Result<AppNotification, CNum> = CNum.create(
      command.CNum,
    );
    if (CNumResult.isFailure()) {
      return 0;
    }

    let specialist: Specialist = SpecialistFactory.createFrom(
      command.firstName,
      command.lastName,
      emailResult.value,
      passwordResult.value,
      CNumResult.value,
    );

    let specialistTypeORM = SpecialistMapper.toTypeORM(specialist);
    specialistTypeORM = await this.specialistRepository.save(specialistTypeORM);

    if (specialistTypeORM == null) {
      return 0;
    }

    const specialistId: number = Number(specialistTypeORM.id.value);
    specialist.changeId(SpecialistId.create(specialistId));

    specialist = this.publisher.mergeObjectContext(specialist);
    specialist.register();
    specialist.commit();

    return specialistId;
  }
}