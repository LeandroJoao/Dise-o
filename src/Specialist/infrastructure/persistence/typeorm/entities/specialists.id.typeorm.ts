import { PrimaryGeneratedColumn } from 'typeorm';

export class SpecialistIdTypeORM {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): SpecialistIdTypeORM {
    return new SpecialistIdTypeORM(value);
  }
}
