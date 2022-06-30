import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FeedbackRegisteredEvent } from '../../../domain/events/feedback-registered.event';

@EventsHandler(FeedbackRegisteredEvent)
export class FeedbackRegisteredHandler implements IEventHandler<FeedbackRegisteredEvent> {
  constructor() {}

  handle(event: FeedbackRegisteredEvent) {
    //something after the registration
    console.log(event);
  }
}