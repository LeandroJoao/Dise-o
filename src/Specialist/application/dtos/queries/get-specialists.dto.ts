import { ApiProperty } from '@nestjs/swagger';

export class GetSpecialistsDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public firstName: string;
  @ApiProperty()
  public lastName: string;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public password: string;
  @ApiProperty()
  public CNum: number;
}