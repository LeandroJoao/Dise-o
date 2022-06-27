import { Module } from '@nestjs/common';
import { ChatsController } from './api/chat.controller';
import { ChatsApplicationService } from './application/services/chat-application.service';
import { CqrsModule, QueryHandler } from '@nestjs/cqrs';
import { RegisterChatValidator } from './application/validators/register-chat.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatTypeORM } from './infrastructure/persistence/typeorm/entities/chat.typeorm';
import { MessageTypeORM } from './infrastructure/persistence/typeorm/entities/message.typeorm';
import { MessagesApplicationService } from './application/services/message-application.service';
import { RegisterMessageValidator } from './application/validators/register-message.validator';
import { RegisterChatHandler } from './application/handlers/commands/register-chat.handler';
import { ChatRegisteredHandler } from './application/handlers/events/chat-registered.handler';
import { GetChatsHandler } from './application/handlers/queries/get-chat.handler';
import { RegisterMessageHandler } from './application/handlers/commands/register-message.handler';
import { MessageRegisteredHandler } from './application/handlers/events/message-registered.handler';

export const CommandHandlers = [RegisterChatHandler, RegisterMessageHandler];
export const EventHandlers = [ChatRegisteredHandler, MessageRegisteredHandler];
export const QueryHandlers = [GetChatsHandler, GetChatsHandler];
export const Validators = [RegisterChatValidator, RegisterMessageValidator];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ChatTypeORM]),
    TypeOrmModule.forFeature([MessageTypeORM]),
  ],
  controllers: [ChatsController],
  providers: [
    ChatsApplicationService,
    RegisterChatValidator,
    MessagesApplicationService,
    RegisterMessageValidator,
    ...Validators,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class ChatsModule {}
