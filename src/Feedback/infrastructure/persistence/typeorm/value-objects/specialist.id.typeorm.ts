import { Column } from 'typeorm';

export class SpecialistIdTypeORM {
  @Column('bigint', { name: 'specialist_id', nullable: true, unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): SpecialistIdTypeORM {
    return new SpecialistIdTypeORM(value);
  }
}