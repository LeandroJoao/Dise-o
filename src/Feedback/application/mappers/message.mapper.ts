import { Message } from '../../domain/entities/message.entity';
import { MessageTypeORM } from '../../infrastructure/persistence/typeorm/entities/message.typeorm';
import { MessageIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/message.id.typeorm';
import { FeedbackIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/feedback.id.typeorm';

export class MessageMapper {
  public static toTypeORM(message: Message): MessageTypeORM {
    const messageTypeORM: MessageTypeORM = new MessageTypeORM();
    messageTypeORM.id = MessageIdTypeORM.from(message.getId().getValue());
    messageTypeORM.feedbackId = FeedbackIdTypeORM.from(message.getFeedbackId().getValue());
    messageTypeORM.from = message.getFrom();
    messageTypeORM.to = message.getTo();
    messageTypeORM.message = message.getMessage();
    messageTypeORM.timestamp = message.getTimestamp().getDate().toString();
    return messageTypeORM;
  }
}