import { ApiProperty } from '@nestjs/swagger';

export class CreateBannerDto{
  @ApiProperty()
  title:string;
  @ApiProperty()
  description:string;
}