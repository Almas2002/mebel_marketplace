import { Module } from '@nestjs/common';
import { ColorService } from './service/color.service';
import { DecorService } from './service/decor.service';
import { FrameService } from './service/frame.service';
import { ProductInfoService } from './product-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entity/color.entity';
import { Decor } from './entity/decor.entity';
import { Frame } from './entity/frame.entity';
import { ProductInfo } from './entity/product-info.entity';
import { ProductInfoController } from './product-info.controller';

@Module({
  providers:[ColorService,DecorService,FrameService,ProductInfoService],
  controllers:[ProductInfoController],
  imports:[TypeOrmModule.forFeature([Color,Decor,Frame,ProductInfo])],
  exports:[ProductInfoService]
})
export class ProductInfoModule{}