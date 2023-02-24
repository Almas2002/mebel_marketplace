import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { CreateProductDto, GetProductListQuery, UpdateProductDto } from './product.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {
  }

  @ApiImplicitFile({ name: 'file', description: 'фото для машины' })
  @UseInterceptors(FileFieldsInterceptor(([{ name: 'file', maxCount: 7 }])))
  @Post()
  create(@Body() dto: CreateProductDto, @UploadedFiles()files: { file: any[] }) {
    console.log(dto);
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
  @ApiQuery({ name: 'marketId', type: 'int', required: false, example: 1 })
  @Get()
  getList(@Query()dto: GetProductListQuery) {
    return this.productService.getList(dto);
  }

  @ApiImplicitFile({ name: 'file', description: 'фото для машины' })
  @UseInterceptors(FileFieldsInterceptor(([{ name: 'file', maxCount: 7 }])))
  @Get('/:id')
  getOne(@Param('id')id: number) {
    return this.productService.getOne(id);
  }
  @UseInterceptors(FileFieldsInterceptor(([{ name: 'file', maxCount: 7 }])))
  @Put('/:id')
  updateProduct(@Body()body: UpdateProductDto,@Param('id')id: number, @UploadedFiles()files: { file: any[] }) {
    console.log(id);
    return this.productService.updateProduct(body, id, files.file);
  }

  @Delete('/photo/:id')
  deletePhoto(@Param('id')id: number) {
    return this.productService.deletePhoto(id);
  }

  @Delete('/color/:colorId/product/:productId')
  deleteColor(@Param('colorId')colorId: number, @Param('productId')productId: number) {
    return this.productService.deleteColor(productId, colorId);
  }

  @Delete('/frame/:frameId/product/:productId')
  deleteFrame(@Param('frameId')frameId: number, @Param('productId')productId: number) {
    return this.productService.deleteFrames(productId, frameId);
  }
}