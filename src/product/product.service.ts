import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreateProductDto, GetProductListQuery, UpdateProductDto } from './product.dto';
import { RegionService } from '../region/region.service';
import { ProductInfoService } from '../product-info/product-info.service';
import { FileService } from '../file/file.service';
import { FeedbackProductService } from '../feedback/service/feedback-product.service';
import { MarketService } from '../market/market.service';
import { MarketNotFoundException } from '../market/market.exception';
import { OrderMarket } from '../order/order-market.entity';
import { OrderQuery } from '../order/order.dto';
import { ProductNotFoundException } from './product.exception';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>, private categoryService: CategoryService,
              private productInfoService: ProductInfoService, private fileService: FileService, private regionService: RegionService,
              private productFeedbackService: FeedbackProductService,private marketService:MarketService) {
  }


  async create(dto: CreateProductDto, userId:number,files: any[]) {
    try {
      const category = await this.categoryService.getCategoryById(dto.categoryId);
      const city = await this.regionService.findOneCityById(dto.cityId);
      const market = await this.marketService.getMarketByUserId(userId)
      const product = await this.productRepository.save({
        category,
        city,
        market:{id:market.id},
        discount: dto.discount,
        price: dto.price,
        title: dto.title,
        description:dto.description
      });
      await this.productFeedbackService.create(product.id);
      for (const file of files) {
        await this.fileService.createImageForProduct(await this.fileService.createFile(file), product);
      }
      const strCollars = dto.colors.split(',');
      for (let color of strCollars) {
        await this.productRepository.query('INSERT INTO product_colors VALUES($1,$2)', [color, product.id]);
      }
       await this.productInfoService.create(product.id, dto, dto.frames);
      return {id:product.id}
    } catch (e) {
      if (typeof e === 'number') {
        await this.productRepository.delete({ id: e });
      }
      throw new HttpException(e, 500);
    }
  }

  async getList(dto: GetProductListQuery): Promise<{ data: Product[], count: number }> {
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;
    const query = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect("product.status","status")
      .addGroupBy("product.id")
      .addGroupBy("images.id")
      .where("product.confirm = :confirm",{confirm:true})

    if (dto?.categoryId) {
      query.andWhere('product.category_id = :categoryId', { categoryId: dto.categoryId });
    }

    if (dto?.cityId) {
      query.andWhere('product.cityId = :cityId', { cityId: dto.cityId });
    }

    if (dto?.discount) {
      query.andWhere('product.discount > 0');
    }
    if (dto?.marketId) {
      query.andWhere('product.market_id = :marketId', { marketId: +dto.marketId });
    }
    if (dto?.photo) {
      query.having('COUNT(images.id) > 0');
    }

    if (dto?.colors) {
      let colors = dto.colors.split(',');
      query.leftJoin('product.colors', 'colors');
      query.andWhere('colors.id IN (:...colors)', { colors });
    }

    if (dto?.priceTo) {
      query.andWhere('product.price <= :priceTo', { priceTo: dto.priceTo });
    }

    if (dto?.priceFrom) {
      query.andWhere('product.price >= :priceFrom', { priceFrom: dto.priceFrom });
    }

    query.take(limit);
    query.skip(offset);

    const data = await query.getManyAndCount();
    return { data: data[0], count: data[1] };
  }

  async getOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['colors', 'images', 'city', 'market', 'status','category', 'info', 'info.frames','info.decor'],
    });
  }
  async getProductById(id:number){
    const product = await this.productRepository.findOne({where:{id }})
    if (!product){
      throw new ProductNotFoundException()
    }
    return product
  }

  async updateProduct(dto: UpdateProductDto, id: number, files: any[]) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (dto.cityId) {
      product.city = await this.regionService.findOneCityById(dto.cityId);
    }
    product.title = dto.title;
    product.price = dto.price;
    product.discount = dto.discount;
    await this.productRepository.save(product);

    if (files?.length){
      for (const file of files) {
        await this.fileService.createImageForProduct(await this.fileService.createFile(file), product);
      }
    }
    if (dto.colors.length){
      const strCollars = dto.colors.split(',');
      for (let color of strCollars) {
        await this.productRepository.query('INSERT INTO product_colors VALUES($1,$2)', [color, product.id]);
      }
    }
    await this.productInfoService.update(product.id, dto, dto.frames);
  }

  async deletePhoto(id: number) {
    await this.fileService.deleteImage(id);
  }

  async deleteColor(productId: number, colorId: number) {
    const product = await this.productRepository.findOne({ where: { id: productId }, relations: ['colors'] });
    const colors = product.colors.filter(color => color.id != colorId);
    product.colors = [...colors];
    await this.productRepository.save(product);
  }

  async deleteFrames(productId: number, frameId: number) {
    await this.productInfoService.deleteFrames(productId, frameId);
  }

  async getProductsAdmin(dto:OrderQuery){
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;
    const query = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
    query.limit(limit);
    query.offset(offset);

    const data = await query.getManyAndCount();
    return { data: data[0], count: data[1] };
  }

  async confirmProduct(id:number){
    const product = await this.productRepository.findOne({where:{id}})
    product.confirm = !product.confirm
    await this.productRepository.save(product)
  }

  async deleteProduct(id:number){
    await this.productRepository.delete({id})
  }


}