import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MarketService } from './market.service';
import { CreateMarketDto, QueryMarket, UpdateMarketDto } from './market.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserDecorator } from '../decorators/user.decorator';

@ApiTags('market')
@Controller('market')
export class MarketController {
  constructor(private marketService: MarketService) {
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(@Body()dto: CreateMarketDto, @UserDecorator('id')id: number, @UploadedFile('file') file: any) {
    return this.marketService.create(dto, id, file);
  }

  @ApiQuery({ name: 'limit', example: 10, required: false })
  @ApiQuery({ name: 'page', example: 1, required: false })
  @ApiQuery({ name: 'title', example: 'market', required: false })
  @ApiQuery({ name: 'userId', example: 10, required: false })
  @Get()
  get(@Query()query: QueryMarket) {
    return this.marketService.get(query);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Put('/:id')
  update(@Param('id')id: number, @Body()dto: UpdateMarketDto, @UploadedFile('file') file: any) {
    return this.marketService.update(id, dto, 1, file);
  }
}