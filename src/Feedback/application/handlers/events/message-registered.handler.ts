import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MessageRegisteredEvent } from '../../../domain/events/message-registered.event';

@EventsHandler(MessageRegisteredEvent)
export class MessageRegisteredHandler implements IEventHandler<MessageRegisteredEvent> {
  constructor() {}

  handle(event: MessageRegisteredEvent) {
    //something after the registration
    console.log(event);
  }
}