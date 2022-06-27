import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SpecialistRegisteredEvent } from '../../../domain/events/specialist-registered.event';

@EventsHandler(SpecialistRegisteredEvent)
export class SpecialistRegisteredHandler implements IEventHandler<SpecialistRegisteredEvent> {
  constructor() {}

  handle(event: SpecialistRegisteredEvent) {
    //something after the registration
    console.log(event);
  }
}