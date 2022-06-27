import { ChatId } from '../value-objects/chat-id.value';
import { UserType } from '../enums/person-type.enum';
import { Message } from '../entities/message.entity';
import { MessageId } from '../value-objects/message-id.value';

export class MessageFactory {
  public static createFrom(
    chatId: ChatId,
    from: UserType,
    to: UserType,
    message: string,
    timestamp: Date,
  ): Message {
    return new Message(
      MessageId.create(0),
      chatId,
      from,
      to,
      message,
      timestamp,
    );
  }

  public static withId(
    messageId: MessageId,
    chatId: ChatId,
    from: UserType,
    to: UserType,
    message: string,
    timestamp: Date,
  ): Message {
    return new Message(messageId, chatId, from, to, message, timestamp);
  }
}
