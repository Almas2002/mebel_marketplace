import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateColorDto } from './dto/color.dto';
import { ColorService } from './service/color.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { OkHandler } from '../handler/ok-handler';
import { FrameService } from './service/frame.service';
import { DecorService } from './service/decor.service';
import { CreateDecorDto } from './dto/decor.dto';
import { CreateFrameDto } from './dto/frame.dto';
import { Color } from './entity/color.entity';
import { Frame } from './entity/frame.entity';
import { Decor } from './entity/decor.entity';

@Controller('product-info')
export class ProductInfoController {
  constructor(private colorService: ColorService, private frameService: FrameService, private decorService: DecorService) {
  }

  @ApiCreatedResponse({ type: OkHandler })
  @Post('color')
  createColor(@Body()dto: CreateColorDto) {
    return this.colorService.create(dto);
  }
  @ApiCreatedResponse({ type: OkHandler })
  @Post('decor')
  createDecor(@Body()dto: CreateDecorDto) {
    return this.decorService.create(dto);
  }
  @ApiCreatedResponse({ type: OkHandler })
  @Post('frame')
  createFrame(@Body()dto:CreateFrameDto){
    return this.frameService.create(dto)
  }

  @ApiOkResponse({type:[Color]})
  @Get("color")
  getColorList(){
    return this.colorService.getList()
  }

  @ApiOkResponse({type:[Decor]})
  @Get("decor")
  getDecorList(){
    return this.decorService.getList()
  }

  @ApiOkResponse({type:[Frame]})
  @Get("frame")
  getFrameList(){
    return this.frameService.getList()
  }
}
