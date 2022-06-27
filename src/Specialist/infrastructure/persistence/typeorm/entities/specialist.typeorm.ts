import { Column, Entity, Unique } from 'typeorm';
import { SpecialistIdTypeORM } from './specialist.id.typeorm';
import { EmailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { PasswordTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/password.typeorm';
import { CNumTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/CNum.typeorm';

@Entity('specialist')
@Unique('UQ_specialist_email', ['email.value'])
export class SpecialistTypeORM {
  @Column((type) => SpecialistIdTypeORM, { prefix: false })
  public id: SpecialistIdTypeORM;
  
  @Column('varchar', { name: 'firstName', length: 75, nullable: false })
  public firstName: string;

  @Column('varchar', { name: 'lastName', length: 75, nullable: false })
  public lastName: string;

  @Column((type) => EmailTypeORM, { prefix: false })
  public email: EmailTypeORM;

  @Column((type) => PasswordTypeORM, { prefix: false })
  public password: PasswordTypeORM;

  @Column((type) => CNumTypeORM, { prefix: false })
  public CNum: CNumTypeORM;

}