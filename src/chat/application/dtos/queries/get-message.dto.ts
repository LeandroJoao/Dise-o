import { ApiProperty } from '@nestjs/swagger';

export class GetMessageDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public chatId: number;
  @ApiProperty()
  public from: number;
  @ApiProperty()
  public to: number;
  @ApiProperty()
  public message: string;
  @ApiProperty()
  public timestamp: Date;
}
