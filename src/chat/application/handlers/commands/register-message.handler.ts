import { RegisterMessageCommand } from '../../commands/register-message.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageTypeORM } from '../../../infrastructure/persistence/typeorm/entities/message.typeorm';
import { Repository } from 'typeorm';
//import { AppNotification } from '../../../../common/application/app.notification';
//import { Result } from 'typescript-result';
import { MessageFactory } from '../../../domain/factories/message.factory';
import { Message } from '../../../domain/entities/message.entity';
import { MessageMapper } from '../../mappers/message.mapper';
import { MessageId } from '../../../domain/value-objects/message-id.value';
//import { MotherId } from 'src/mothers/domain/value-objects/mother-id.value';
import { ChatId } from 'src/chat/domain/value-objects/chat-id.value';


@CommandHandler(RegisterMessageCommand)
export class RegisterMessageHandler
  implements ICommandHandler<RegisterMessageCommand>
{
  constructor(
    @InjectRepository(MessageTypeORM)
    private MessageRepository: Repository<MessageTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterMessageCommand) {
    const idChat:ChatId=ChatId.create(command.idChat);
    let message: Message = MessageFactory.createFrom(
      idChat,
      command.from,
      command.to,
      command.message,
      command.timestamp,
    );

    let MessageTypeORM = MessageMapper.toTypeORM(message);
    MessageTypeORM = await this.MessageRepository.save(MessageTypeORM);

    if (MessageTypeORM == null) {
      return 0;
    }

    message = this.publisher.mergeObjectContext(message);
    message.register();
    message.commit();

    return MessageId;
  }
}