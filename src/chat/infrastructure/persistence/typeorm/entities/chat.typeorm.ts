import { Column, Entity, Unique } from 'typeorm';
import { ChatIdTypeORM } from '../value-objects/chat.id.typeorm';
import { MotherIdTypeORM } from '../../../../../chat/infrastructure/persistence/typeorm/value-objects/mother.id.typeorm';
import { ObstetricianIdTypeORM } from '../../../../../chat/infrastructure/persistence/typeorm/value-objects/obstetrician.id.typeorm';

@Entity('Chat')
@Unique('UQ_Chat_id', ['id.value'])
export class ChatTypeORM {
  @Column((type) => ChatIdTypeORM, { prefix: false })
  public id: ChatIdTypeORM;

  @Column((type) => MotherIdTypeORM, { prefix: false })
  public motherId: MotherIdTypeORM;

  @Column((type) => ObstetricianIdTypeORM, { prefix: false })
  public obstetricianId: ObstetricianIdTypeORM;

  @Column('varchar', { name: 'timestamp', length: 30, nullable: false })
  public timestamp: Date;
}
