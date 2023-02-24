import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { getManager, Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreateProductDto, GetProductListQuery, UpdateProductDto } from './product.dto';
import { RegionService } from '../region/region.service';
import { ProductInfoService } from '../product-info/product-info.service';
import { Color } from '../product-info/entity/color.entity';
import { FileService } from '../file/file.service';
import { FeedbackProductService } from '../feedback/service/feedback-product.service';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>, private categoryService: CategoryService,
              private productInfoService: ProductInfoService, private fileService: FileService, private regionService: RegionService,
              private productFeedbackService: FeedbackProductService) {
  }


  async create(dto: CreateProductDto, files: any[]) {
    try {
      const category = await this.categoryService.getCategoryById(dto.categoryId);
      const city = await this.regionService.findOneCityById(dto.cityId);
      const product = await this.productRepository.save({
        category,
        city,
        market: { id: dto.marketId },
        discount: dto.discount,
        price: dto.price,
        title: dto.title,
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
      .addGroupBy("product.id")
      .addGroupBy("images.id")

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

    query.limit(limit);
    query.offset(offset);

    const data = await query.getManyAndCount();
    return { data: data[0], count: data[1] };
  }

  async getOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['colors', 'images', 'city', 'market', 'status', 'info', 'info.frames','info.decor'],
    });
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

    for (const file of files) {
      await this.fileService.createImageForProduct(await this.fileService.createFile(file), product);
    }
    const strCollars = dto.colors.split(',');
    for (let color of strCollars) {
      await this.productRepository.query('INSERT INTO product_colors VALUES($1,$2)', [color, product.id]);
    }
    await this.productInfoService.update(product.id, dto, dto.frames);
  }

  async deletePhoto(id: number) {
    await this.fileService.deleteImage(id);
  }

  async deleteColor(productId: number, colorId: number) {
    console.log(productId,colorId);
    const product = await this.productRepository.findOne({ where: { id: productId }, relations: ['colors'] });
    console.log(product);
    const colors = product.colors.filter(color => color.id != colorId);
    console.log(colors);
    product.colors = [...colors];
    await this.productRepository.save(product);
  }

  async deleteFrames(productId: number, frameId: number) {
    await this.productInfoService.deleteFrames(productId, frameId);
  }


}