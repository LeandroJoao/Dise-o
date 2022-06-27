import { Column } from "typeorm";

export class CNumTypeORM {
  @Column('int', {name: 'CNum', nullable: false })
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): CNumTypeORM {
    return new CNumTypeORM(value);
  }
}