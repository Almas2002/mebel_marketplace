import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { FileService } from '../file/file.service';
import { CreateCategoryDto, QueryCategories } from './category.dto';
import { CategoryExistException, CategoryNotFoundException } from './category.exception';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>, private fileService: FileService) {
  }

  async create(dto: CreateCategoryDto, file: any): Promise<{ id: number }> {
    let parent = null;
    if (dto.categoryId) {
      parent = await this.getCategoryById(dto.categoryId);
    }
    let fileName = '';
    if (file) {
      fileName = await this.fileService.createFile(file);
    }
    const category = await this.categoryRepository.save({ parent, title: dto.title, icon: fileName });
    return { id: category.id };
  }

  private async getCategoryByTittle(title: string): Promise<Category> {
    return await this.categoryRepository.findOne({ where: { title } });
  }

  async getCategoryById(id: number) {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async getCategories(query: QueryCategories): Promise<{ data: Category[], count: number }> {
    const limit = query?.limit || 10;
    const page = query?.page || 1;
    const offset = page * limit - limit;

    const sqlQuery = await this.categoryRepository.createQueryBuilder('category');


    if (query?.parentId) {
      sqlQuery.andWhere('category.parentId = :parentId', { parentId: query.parentId });
    } else {
      sqlQuery.andWhere('category.parentId IS NULL');
    }


    sqlQuery.limit(limit);
    sqlQuery.offset(offset);
    const data = await sqlQuery.getManyAndCount();
    return { data: data[0], count: data[1] };
  }

  async delete(id:number){
    await this.categoryRepository.delete({id})
  }
}