import { PrimaryGeneratedColumn } from 'typeorm';

export class FeedbackIdTypeORM {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): FeedbackIdTypeORM {
    return new FeedbackIdTypeORM(value);
  }
}
