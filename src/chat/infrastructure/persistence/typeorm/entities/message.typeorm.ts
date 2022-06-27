import { Column, Entity, Unique } from 'typeorm';
import { ChatIdToTypeORM } from '../value-objects/chat.id.to.typeorm';
import { MessageIdTypeORM } from '../value-objects/message.id.typeorm';

@Entity('Chat')
@Unique('UQ_Chat_id', ['id.value'])
export class MessageTypeORM {
  @Column((type) => MessageIdTypeORM, { prefix: false })
  public id: MessageIdTypeORM;

  @Column((type) => ChatIdToTypeORM, { prefix: false })
  public chatId: ChatIdToTypeORM;

  @Column('varchar', { name: 'message', length: 500, nullable: false })
  public message: string;

  @Column('int', { name: 'from', nullable: false })
  public from: number;

  @Column('int', { name: 'to', nullable: false })
  public to: number;

  @Column('varchar', { name: 'timestamp', length: 30, nullable: false })
  public timestamp: string;
}
