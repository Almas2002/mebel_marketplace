import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MarketService } from './market.service';
import { CreateMarketDto, QueryMarket, UpdateMarketDto } from './market.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserDecorator } from '../decorators/user.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';

@ApiTags('market')
@Controller('market')
export class MarketController {
  constructor(private marketService: MarketService) {
  }
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(AuthGuard)
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
  get(@Query()query: QueryMarket,@UserDecorator('id')id:number) {
    if(!query?.userId){
      query.userId = id
    }
    return this.marketService.get(query);
  }
  @ApiBearerAuth('defaultBearerAuth')
  @UseInterceptors(FileInterceptor('file'))
  @Put('/:id')
  update(@Param('id')id: number, @Body()dto: UpdateMarketDto, @UploadedFile('file') file: any,@UserDecorator('id')userId:number) {
    return this.marketService.update(id, dto, userId, file);
  }
}