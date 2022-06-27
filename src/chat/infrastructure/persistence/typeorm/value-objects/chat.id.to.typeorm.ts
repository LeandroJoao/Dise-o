import { Column } from 'typeorm';

export class ChatIdToTypeORM {
  @Column('bigint', { name: 'mother_id', nullable: true, unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): ChatIdToTypeORM {
    return new ChatIdToTypeORM(value);
  }
}