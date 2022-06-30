import { Feedback } from '../entities/feedback.entity';
import { FeedbackId } from '../value-objects/feedback-id.value';
import { PadresId } from '../../../mothers/domain/value-objects/mother-id.value';
import { SpecialistId } from '../../../Specialist/domain/value-objects/specialist-id.value';

export class FeedbackFactory {
  public static createFrom(
    PadresId: PadresId,
    specialistId: SpecialistId,
    timestamp: Date,
  ): Feedback {
    return new Feedback(FeedbackId.create(0), PadresId, specialistId, timestamp);
  }

  public static withId(
    FeedbackId: FeedbackId,
    motherId: PadresId,
    specialistId: SpecialistId,
    timestamp: Date,
  ): Feedback {
    return new Feedback(FeedbackId, motherId, specialistId, timestamp);
  }
}
