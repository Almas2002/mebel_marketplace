import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class CreateFeedbackDto{
  @ApiProperty()
  comment:string;
  @ApiProperty()
  @Max(5)
  @Min(1)
  star:number
  @ApiProperty()
  productId:number
}
export class GetFeedbacksQuery{
  productId:number;
  limit:number;
  page:number;
}