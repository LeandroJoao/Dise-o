import { Column, Entity, Unique } from "typeorm";
import { PadresIdTypeORM } from "./mother.id.typeorm";
import { EmailTypeORM } from "../../../../../common/infrastructure/persistence/typeorm/entities/email.typeorm";
import { PasswordTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/password.typeorm';

@Entity('mothers')
@Unique('UQ_mothers_email', ['email.value'])
export class PadresTypeORM {
  @Column((type) => PadresIdTypeORM, { prefix: false })
  public id: PadresIdTypeORM;

  @Column('varchar', { name: 'name', length: 50, nullable: false })
  public name: string;

  @Column('varchar', { name: 'last_name', length: 50, nullable: false })
  public lastName: string;

  @Column((type) => EmailTypeORM, { prefix: false })
  public email: EmailTypeORM;

  @Column((type) => PasswordTypeORM, { prefix: false })
  public password: PasswordTypeORM;

}