import { RegisterPadresCommand } from '../../commands/register-mother.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { PadresTypeORM } from '../../../infrastructure/persistence/typeorm/entities/mother.typeorm';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../../common/application/app.notification';
import { Email } from '../../../domain/value-objects/email.value';
import { Result } from 'typescript-result';

import { PadresFactory } from '../../../domain/factories/mother.factory';
import { Padres } from '../../../domain/entities/mother.entity';
import { PadresMapper } from '../../mappers/mother.mapper';
import { PadresId } from '../../../domain/value-objects/mother-id.value';
import { Password } from '../../../../common/domain/value-objects/password.value';

@CommandHandler(RegisterPadresCommand)
export class RegisterPadresHandler
  implements ICommandHandler<RegisterPadresCommand>
{
  constructor(
    @InjectRepository(PadresTypeORM)
    private padresRepository: Repository<PadresTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterPadresCommand) {
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


    let padres: Padres = PadresFactory.createFrom(
      command.name,
      command.lastName,
      emailResult.value,
      passwordResult.value
    );

    let padresTypeORM = PadresMapper.toTypeORM(padres);
    padresTypeORM = await this.padresRepository.save(padresTypeORM);

    if (padresTypeORM == null) {
      return 0;
    }

    const padresId: number = Number(padresTypeORM.id.value);
    padres.changeId(PadresId.create(padresId));

    padres = this.publisher.mergeObjectContext(padres);
    padres.register();
    padres.commit();

    return padresId;
  }
}