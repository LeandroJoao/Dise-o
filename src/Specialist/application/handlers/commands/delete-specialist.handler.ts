import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSpecialistCommand } from '../../commands/delete-specialist.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecialistTypeORM } from '../../../infrastructure/persistence/typeorm/entities/specialist.typeorm';

@CommandHandler(DeleteSpecialistCommand)
export class DeleteSpecialistHandler
  implements ICommandHandler<DeleteSpecialistCommand>
{
  constructor(
    @InjectRepository(SpecialistTypeORM)
    private specialistRepository: Repository<SpecialistTypeORM>,
  ) {}

  async execute(command: DeleteSpecialistCommand) {
    const id = command.id;

    const specialist = await this.specialistRepository.findOne(id);
    await this.specialistRepository.delete(id);

    return specialist;
  }
}