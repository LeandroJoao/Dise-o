import { RegisterFeedbackCommand } from '../../commands/register-feedback.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackTypeORM } from '../../../infrastructure/persistence/typeorm/entities/feedback.typeorm';
import { Repository } from 'typeorm';
//import { AppNotification } from '../../../../common/application/app.notification';
//import { Result } from 'typescript-result';
import { FeedbackFactory } from '../../../domain/factories/feedback.factory';
import { Feedback } from '../../../domain/entities/feedback.entity';
import { FeedbackMapper } from '../../mappers/feedback.mapper';
import { FeedbackId } from '../../../domain/value-objects/feedback-id.value';
import { PadresId } from 'src/mothers/domain/value-objects/mother-id.value';
import { SpecialistId} from 'src/Specialist/domain/value-objects/specialist-id.value';


@CommandHandler(RegisterFeedbackCommand)
export class RegisterFeedbackHandler
  implements ICommandHandler<RegisterFeedbackCommand>
{
  constructor(
    @InjectRepository(FeedbackTypeORM)
    private FeedbackRepository: Repository<FeedbackTypeORM>,
    private publisher: EventPublisher,
    //private readonly motherId: MotherId,
  ) {}

  async execute(command: RegisterFeedbackCommand) {
    const motherId: PadresId = PadresId.create(command.fatherId);
    const specialist: SpecialistId = SpecialistId.create(command.specialist);
    let Feedback: Feedback = FeedbackFactory.createFrom(
      motherId,
      specialist,
      command.timestamp,
    );
    let FeedbackTypeORM = FeedbackMapper.toTypeORM(Feedback);
    FeedbackTypeORM = await this.FeedbackRepository.save(FeedbackTypeORM);

    if (FeedbackTypeORM == null) {
      return 0;
    }

    Feedback = this.publisher.mergeObjectContext(Feedback);
    Feedback.register();
    Feedback.commit();

    return FeedbackId;
  }
}