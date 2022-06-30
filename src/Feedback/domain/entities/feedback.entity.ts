import { AggregateRoot } from '@nestjs/cqrs';
import { FeedbackId } from '../value-objects/feedback-id.value';
import { FeedbackRegisteredEvent } from '../events/feedback-registered.event';
import { PadresId } from '../../../mothers/domain/value-objects/mother-id.value';
import { SpecialistId } from '../../../Specialist/domain/value-objects/specialist-id.value';

export class Feedback extends AggregateRoot {
  private id: FeedbackId;
  private fatherId: PadresId;
  private specialistId: SpecialistId;
  private timestamp: Date;

  public constructor(
    id: FeedbackId,
    fatherId: PadresId,
    specialistId: SpecialistId,
    timestamp: Date,
  ) {
    super();
    this.id = id;
    this.fatherId = fatherId;
    this.specialistId = specialistId;
    this.timestamp = timestamp;
  }

  public register() {
    const event = new FeedbackRegisteredEvent(
      this.id.getValue(),
      this.fatherId.getValue(),
      this.specialistId.getValue(),
      this.timestamp,
    );
    this.apply(event);
  }

  public getId(): FeedbackId {
    return this.id;
  }

  public getFatherId(): PadresId {
    return this.fatherId;
  }

  public getSpecialistId(): SpecialistId {
    return this.specialistId;
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }

  public changeId(id: FeedbackId) {
    this.id = id;
  }

  public changeFatherId(id: PadresId) {
    this.fatherId = id;
  }

  public changeSpecialistId(id: SpecialistId) {
    this.specialistId = id;
  }

  public changeTimestamp(id: Date) {
    this.timestamp = id;
  }
}
