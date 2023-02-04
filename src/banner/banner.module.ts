import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './banner.entity';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { FileModule } from '../file/file.module';

@Module({
  imports:[TypeOrmModule.forFeature([Banner]),FileModule],
  providers:[BannerService],
  controllers:[BannerController]
})
export class BannerModule{

}