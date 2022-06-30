import { Column, Entity, Unique } from 'typeorm';
import { FeedbackIdTypeORM } from '../value-objects/feedback.id.typeorm';
import { FatherIdTypeORM } from '../value-objects/father.id.typeorm';
import { SpecialistIdTypeORM } from '../value-objects/specialist.id.typeorm';

@Entity('Feedback')
@Unique('UQ_Feedback_id', ['id.value'])
export class FeedbackTypeORM {
  @Column((type) => FeedbackIdTypeORM, { prefix: false })
  public id: FeedbackIdTypeORM;

  @Column((type) => FatherIdTypeORM, { prefix: false })
  public fatherId: FatherIdTypeORM;

  @Column((type) => SpecialistIdTypeORM, { prefix: false })
  public specialistId: SpecialistIdTypeORM;

  @Column('varchar', { name: 'timestamp', length: 30, nullable: false })
  public timestamp: Date;
}
