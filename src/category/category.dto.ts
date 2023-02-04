import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto{
  @ApiProperty({required:false})
  categoryId:number;
  @ApiProperty()
  title:string
}

export class QueryCategories {
  limit:number
  page:number
  parentId:number
}