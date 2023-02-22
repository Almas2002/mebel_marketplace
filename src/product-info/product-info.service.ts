import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductInfo } from './entity/product-info.entity';
import { Repository } from 'typeorm';
import { CreateProductInfoDto } from './dto/product-info.dto';
import { ColorService } from './service/color.service';
import { DecorService } from './service/decor.service';
import { Frame } from './entity/frame.entity';
import { FrameService } from './service/frame.service';
import { Color } from './entity/color.entity';

@Injectable()
export class ProductInfoService {
  constructor(@InjectRepository(ProductInfo) private productInfoRepository: Repository<ProductInfo>, private colorService: ColorService,
              private decorService: DecorService, private frameService: FrameService) {}

  async create(productId: number, dto: CreateProductInfoDto, framesId:string) {
    try {
      const decor = await this.decorService.getById(dto.decorId);
      const info = await this.productInfoRepository.save({ decor, product: { id: productId }, ...dto });
      const frame = framesId.split(",")
      for (let frameId of frame) {
        await this.productInfoRepository.query("INSERT INTO product_info_frames VALUES($1,$2)",[info.id,frameId])
      }
    } catch (e) {
      return productId;
    }
  }

  async getColorById(id: number): Promise<Color> {
    return this.colorService.getById(id);
  }
}