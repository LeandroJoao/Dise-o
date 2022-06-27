import { Email } from '../../../domain/value-objects/email.value';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../../common/application/app.notification';
import { Password } from '../../../../common/domain/value-objects/password.value';
import { PadresTypeORM } from '../../../infrastructure/persistence/typeorm/entities/mother.typeorm';
import { PadresId } from '../../../domain/value-objects/mother-id.value';
import { Result } from 'typescript-result';
import { PadresFactory } from '../../../domain/factories/mother.factory';
import { Padres } from '../../../domain/entities/mother.entity';
import { PadresMapper } from '../../mappers/mother.mapper';
import { UpdatePadresCommand } from '../../commands/update-mother.command';

@CommandHandler(UpdatePadresCommand)
export class UpdatePadresHandler
  implements ICommandHandler<UpdatePadresCommand>
{
  constructor(
    @InjectRepository(PadresTypeORM)
    private padresRepository: Repository<PadresTypeORM>,
  ) {}

  async execute(command: UpdatePadresCommand) {
    const idResult: PadresId = PadresId.create(command.id);

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


    const padres: Padres = PadresFactory.withId(
      idResult,
      command.name,
      command.lastName,
      emailResult.value,
      passwordResult.value,
    );

    const padresTypeORM = PadresMapper.toTypeORM(padres);
    await this.padresRepository.update(command.targetId, padresTypeORM);

    return padresTypeORM;
  }
}
