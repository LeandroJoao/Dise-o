import { ApiProperty } from '@nestjs/swagger';

export class GetChatDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public motherId: number;
  @ApiProperty()
  public obstetraId: number;
  @ApiProperty()
  public timestamp: Date;
}
