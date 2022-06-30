import { FeedbackTypeORM } from '../../infrastructure/persistence/typeorm/entities/feedback.typeorm';
import { Feedback } from '../../domain/entities/feedback.entity';
import { FeedbackIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/feedback.id.typeorm';
import { PadresIdTypeORM } from '../../../mothers/infrastructure/persistence/typeorm/entities/mother.id.typeorm';
import { SpecialistIdTypeORM } from '../../../Specialist/infrastructure/persistence/typeorm/entities/specialist.id.typeorm';

export class FeedbackMapper {
  public static toTypeORM(feedback: Feedback): FeedbackTypeORM {
    const feedbackTypeORM: FeedbackTypeORM = new FeedbackTypeORM();

    feedbackTypeORM.id = FeedbackIdTypeORM.from(feedback.getId().getValue());
    feedbackTypeORM.fatherId = PadresIdTypeORM.from(feedback.getFatherId().getValue());
    feedbackTypeORM.specialistId = SpecialistIdTypeORM.from(
      feedback.getSpecialistId().getValue(),
    );
    feedbackTypeORM.timestamp = feedback.getTimestamp();

    return feedbackTypeORM;
  }
}
