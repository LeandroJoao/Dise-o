import { Column } from 'typeorm';

export class FeedbackIdToTypeORM {
  @Column('bigint', { name: 'father_id', nullable: true, unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): FeedbackIdToTypeORM {
    return new FeedbackIdToTypeORM(value);
  }
}