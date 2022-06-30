import { FeedbackId } from '../value-objects/feedback-id.value';
import { UserType } from '../enums/person-type.enum';
import { Message } from '../entities/message.entity';
import { MessageId } from '../value-objects/message-id.value';

export class MessageFactory {
  public static createFrom(
    feedbackId: FeedbackId,
    from: UserType,
    to: UserType,
    message: string,
    timestamp: Date,
  ): Message {
    return new Message(
      MessageId.create(0),
      feedbackId,
      from,
      to,
      message,
      timestamp,
    );
  }

  public static withId(
    messageId: MessageId,
    feedbackId: FeedbackId,
    from: UserType,
    to: UserType,
    message: string,
    timestamp: Date,
  ): Message {
    return new Message(messageId, feedbackId, from, to, message, timestamp);
  }
}
