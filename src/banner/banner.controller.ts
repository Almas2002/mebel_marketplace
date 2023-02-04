import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './banner.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('banner')
@Controller('banner')
export class BannerController {
  constructor(private bannerService: BannerService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(@Body()dto: CreateBannerDto, @UploadedFile('file')file: any) {
    return this.bannerService.create(dto, file);
  }

  @Get()
  getBanners() {
    return this.bannerService.get();
  }
}