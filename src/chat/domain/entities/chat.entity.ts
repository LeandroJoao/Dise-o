import { AggregateRoot } from '@nestjs/cqrs';
import { ChatId } from '../value-objects/chat-id.value';
import { ChatRegisteredEvent } from '../events/chat-registered.event';
import { PadresId } from '../../../mothers/domain/value-objects/mother-id.value';
import { SpecialistId } from '../../../specialist/domain/value-objects/specialist-id.value';

export class Chat extends AggregateRoot {
  private id: ChatId;
  private motherId: PadresId;
  private obstetricianId: SpecialistId;
  private timestamp: Date;

  public constructor(
    id: ChatId,
    motherId: PadresId,
    obstetricianId: SpecialistId,
    timestamp: Date,
  ) {
    super();
    this.id = id;
    this.motherId = motherId;
    this.obstetricianId = obstetricianId;
    this.timestamp = timestamp;
  }

  public register() {
    const event = new ChatRegisteredEvent(
      this.id.getValue(),
      this.motherId.getValue(),
      this.obstetricianId.getValue(),
      this.timestamp,
    );
    this.apply(event);
  }

  public getId(): ChatId {
    return this.id;
  }

  public getMotherId(): PadresId {
    return this.motherId;
  }

  public getObstetricianId(): SpecialistId {
    return this.obstetricianId;
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }

  public changeId(id: ChatId) {
    this.id = id;
  }

  public changeMotherId(id: PadresId) {
    this.motherId = id;
  }

  public changeObstetricianId(id: SpecialistId) {
    this.obstetricianId = id;
  }

  public changeTimestamp(id: Date) {
    this.timestamp = id;
  }
}
