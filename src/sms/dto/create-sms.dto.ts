import { ApiProperty } from '@nestjs/swagger';

export class CreateSmsDto {
  @ApiProperty({example:"87478015284",description:"телефон номер"})
  phone:string
}

export class CheckSmsDto {
  @ApiProperty({example:"87478015254",description:"телефон номер"})
  phone:string
  @ApiProperty({example:"2225",description:"смс код"})
  code:number
}