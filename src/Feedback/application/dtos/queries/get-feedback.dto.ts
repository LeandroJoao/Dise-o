import { ApiProperty } from '@nestjs/swagger';

export class GetFeedbackDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public fatherId: number;
  @ApiProperty()
  public specialistId: number;
  @ApiProperty()
  public timestamp: Date;
}
