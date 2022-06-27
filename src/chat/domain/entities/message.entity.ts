import { AggregateRoot } from '@nestjs/cqrs';
import { MessageId } from '../value-objects/message-id.value';
import { UserType } from '../enums/person-type.enum';
import { MessageRegisteredEvent } from '../events/message-registered.event';
import { ChatId } from '../value-objects/chat-id.value';

export class Message extends AggregateRoot {
  private id: MessageId;
  private chatId: ChatId;
  private from: UserType;
  private to: UserType;
  private message: string;
  public timestamp: Date;

  public constructor(
    id: MessageId,
    chatId: ChatId,
    from: UserType,
    to: UserType,
    message: string,
    timestamp: Date,
  ) {
    super();
    this.id = id;
    this.chatId = chatId;
    this.from = from;
    this.to = to;
    this.message = message;
    this.timestamp = timestamp;
  }

  public register() {
    const event = new MessageRegisteredEvent(
      this.id.getValue(),
      this.chatId.getValue(),
      this.from,
      this.to,
      this.message,
      this.timestamp,
    );
    this.apply(event);
  }

  public getId(): MessageId {
    return this.id;
  }

  public getFrom(): UserType {
    return this.from;
  }

  public getChatId(): ChatId {
    return this.chatId;
  }

  public getMessage(): string {
    return this.message;
  }

  public getTo(): UserType {
    return this.to;
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }

  //TODO: IMPLEMENT CHANGE METODS (SET) FROM MESSAGE ENTITY
}
