import { Module } from '@nestjs/common';
import { FeedbacksController } from './api/feedback.controller';
import { FeedbacksApplicationService } from './application/services/feedback-application.service';
import { CqrsModule, QueryHandler } from '@nestjs/cqrs';
import { RegisterFeedbackValidator } from './application/validators/register-feedback.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackTypeORM } from './infrastructure/persistence/typeorm/entities/feedback.typeorm';
import { MessageTypeORM } from './infrastructure/persistence/typeorm/entities/message.typeorm';
import { MessagesApplicationService } from './application/services/message-application.service';
import { RegisterMessageValidator } from './application/validators/register-message.validator';
import { RegisterFeedbackHandler } from './application/handlers/commands/register-feedback.handler';
import { FeedbackRegisteredHandler } from './application/handlers/events/feedback-registered.handler';
import { GetFeedbacksHandler } from './application/handlers/queries/get-feedback.handler';
import { RegisterMessageHandler } from './application/handlers/commands/register-message.handler';
import { MessageRegisteredHandler } from './application/handlers/events/message-registered.handler';

export const CommandHandlers = [RegisterFeedbackHandler, RegisterMessageHandler];
export const EventHandlers = [FeedbackRegisteredHandler, MessageRegisteredHandler];
export const QueryHandlers = [GetFeedbacksHandler, GetFeedbacksHandler];
export const Validators = [RegisterFeedbackValidator, RegisterMessageValidator];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([FeedbackTypeORM]),
    TypeOrmModule.forFeature([MessageTypeORM]),
  ],
  controllers: [FeedbacksController],
  providers: [
    FeedbacksApplicationService,
    RegisterFeedbackValidator,
    MessagesApplicationService,
    RegisterMessageValidator,
    ...Validators,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class FeedbacksModule {}
