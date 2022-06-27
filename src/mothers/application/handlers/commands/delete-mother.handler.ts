import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PadresTypeORM } from '../../../infrastructure/persistence/typeorm/entities/mother.typeorm';
import { DeletePadresCommand } from '../../commands/delete-mother.command';

@CommandHandler(DeletePadresCommand)
export class DeletePadresHandler
  implements ICommandHandler<DeletePadresCommand>
{
  constructor(
    @InjectRepository(PadresTypeORM)
    private padresRepository: Repository<PadresTypeORM>,
  ) {}

  async execute(command: DeletePadresCommand) {
    const id = command.id;

    const mother = await this.padresRepository.findOne(id);
    await this.padresRepository.delete(id);

    return mother;
  }
}