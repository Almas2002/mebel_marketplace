import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, QueryCategories } from './category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags("category")
@Controller("category")
export class CategoryController{
  constructor(private categoryService:CategoryService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(@Body()dto:CreateCategoryDto, @UploadedFile('file') file: any){
    return this.categoryService.create(dto,file)
  }

  @ApiQuery({name:"limit",required:false,type:"int",example:10})
  @ApiQuery({name:"page",required:false,type:"int",example:1})
  @ApiQuery({name:"parentId",required:false,type:"int",example:1})
  @Get()
  get(@Query()query:QueryCategories){
     return this.categoryService.getCategories(query)
  }

  @Delete(":id")
  delete(@Param('id')id:number){
    return this.categoryService.delete(id)
  }

  @UseInterceptors(FileInterceptor('file'))
  @Put(":id")
  update(@Param('id')id:number,@Body()dto:CreateCategoryDto,@UploadedFile('file') file: any){
    return this.categoryService.update(dto,id,file)
  }
}