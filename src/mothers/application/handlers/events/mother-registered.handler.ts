import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PadresRegisteredEvent } from '../../../domain/events/mother-registered.event';

@EventsHandler(PadresRegisteredEvent)
export class PadresRegisteredHandler implements IEventHandler<PadresRegisteredEvent> {
  constructor() {}

  handle(event:PadresRegisteredEvent) {
    //something after the registration
    console.log(event);
  }
}