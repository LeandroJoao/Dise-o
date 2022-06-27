import { Column } from "typeorm";

export class NameTypeORM {
  @Column('varchar', {name: 'firstName', length: 75, nullable: false })
  public name: string;

  private constructor(firstName: string) {
    this.name = firstName;
  }

  public static from(firstName: string): NameTypeORM {
    return new NameTypeORM(firstName);
  }
}