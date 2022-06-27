import { Column } from 'typeorm';

export class ObstetricianIdTypeORM {
  @Column('bigint', { name: 'obstetrician_id', nullable: true, unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): ObstetricianIdTypeORM {
    return new ObstetricianIdTypeORM(value);
  }
}