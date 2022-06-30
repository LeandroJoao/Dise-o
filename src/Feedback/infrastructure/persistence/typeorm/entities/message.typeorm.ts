import { Column, Entity, Unique } from 'typeorm';
import { FeedbackIdToTypeORM } from '../value-objects/feedback.id.to.typeorm';
import { MessageIdTypeORM } from '../value-objects/message.id.typeorm';

@Entity('Feedback')
@Unique('UQ_Feedback_id', ['id.value'])
export class MessageTypeORM {
  @Column((type) => MessageIdTypeORM, { prefix: false })
  public id: MessageIdTypeORM;

  @Column((type) => FeedbackIdToTypeORM, { prefix: false })
  public feedbackId: FeedbackIdToTypeORM;

  @Column('varchar', { name: 'message', length: 500, nullable: false })
  public message: string;

  @Column('int', { name: 'from', nullable: false })
  public from: number;

  @Column('int', { name: 'to', nullable: false })
  public to: number;

  @Column('varchar', { name: 'timestamp', length: 30, nullable: false })
  public timestamp: string;
}
