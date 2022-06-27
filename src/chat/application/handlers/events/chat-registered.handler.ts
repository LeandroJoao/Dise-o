import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ChatRegisteredEvent } from '../../../domain/events/chat-registered.event';

@EventsHandler(ChatRegisteredEvent)
export class ChatRegisteredHandler implements IEventHandler<ChatRegisteredEvent> {
  constructor() {}

  handle(event: ChatRegisteredEvent) {
    //something after the registration
    console.log(event);
  }
}