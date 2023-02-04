import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { CreateProductDto, GetProductListQuery } from './product.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags("product")
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {
  }

  @ApiImplicitFile({ name: 'file', description: 'фото для машины' })
  @UseInterceptors(FileFieldsInterceptor(([{ name: 'file', maxCount: 7 }])))
  @Post()
  create(@Body() dto: CreateProductDto, @UploadedFiles()files: { file: any[] }) {
    return this.productService.create(dto, files.file);
  }

  @ApiQuery({ name: 'limit', type: 'int', required: false })
  @ApiQuery({ name: 'page', type: 'int', required: false })
  @ApiQuery({ name: 'categoryId', type: 'int', required: false })
  @ApiQuery({ name: 'parentCategoryId', type: 'int', required: false })
  @ApiQuery({ name: 'cityId', type: 'int', required: false })
  @ApiQuery({ name: 'priceFrom', type: 'int', required: false })
  @ApiQuery({ name: 'priceTo', type: 'int', required: false })
  @ApiQuery({ name: 'discount', type: 'boolean', required: false })
  @ApiQuery({ name: 'photo', type: 'boolean', required: false })
  @ApiQuery({ name: 'colors', type: 'string', required: false, example: '1,2,3' })
  @Get()
  getList(@Query()dto: GetProductListQuery) {
    return this.productService.getList(dto);
  }

  @Get('/:id')
  getOne(@Param('id')id: number) {
    return this.productService.getOne(id);
  }
}