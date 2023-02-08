import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductController } from './product.controller';
import { CategoryModule } from '../category/category.module';
import { ProductInfoModule } from '../product-info/product-info.module';
import { RegionModule } from '../region/region.module';
import { FileModule } from '../file/file.module';
import { FeedbackModule } from '../feedback/feedback.module';

@Module({
  providers:[ProductService],
  imports:[TypeOrmModule.forFeature([Product]),CategoryModule,ProductInfoModule,RegionModule,FileModule,FeedbackModule],
  controllers:[ProductController]
})
export class ProductModule{

}