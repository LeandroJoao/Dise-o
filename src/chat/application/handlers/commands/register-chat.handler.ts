import { RegisterChatCommand } from '../../commands/register-chat.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatTypeORM } from '../../../infrastructure/persistence/typeorm/entities/chat.typeorm';
import { Repository } from 'typeorm';
//import { AppNotification } from '../../../../common/application/app.notification';
//import { Result } from 'typescript-result';
import { ChatFactory } from '../../../domain/factories/chat.factory';
import { Chat } from '../../../domain/entities/chat.entity';
import { ChatMapper } from '../../mappers/chat.mapper';
import { ChatId } from '../../../domain/value-objects/chat-id.value';
import { PadresId } from 'src/mothers/domain/value-objects/mother-id.value';
import { SpecialistId} from 'src/specialist/domain/value-objects/specialist-id.value';


@CommandHandler(RegisterChatCommand)
export class RegisterChatHandler
  implements ICommandHandler<RegisterChatCommand>
{
  constructor(
    @InjectRepository(ChatTypeORM)
    private ChatRepository: Repository<ChatTypeORM>,
    private publisher: EventPublisher,
    //private readonly motherId: MotherId,
  ) {}

  async execute(command: RegisterChatCommand) {
    const motherId: PadresId = PadresId.create(command.motherId);
    const obstetra: SpecialistId = SpecialistId.create(command.obstetra);
    let Chat: Chat = ChatFactory.createFrom(
      motherId,
      obstetra,
      command.timestamp,
    );
    let ChatTypeORM = ChatMapper.toTypeORM(Chat);
    ChatTypeORM = await this.ChatRepository.save(ChatTypeORM);

    if (ChatTypeORM == null) {
      return 0;
    }

    Chat = this.publisher.mergeObjectContext(Chat);
    Chat.register();
    Chat.commit();

    return ChatId;
  }
}