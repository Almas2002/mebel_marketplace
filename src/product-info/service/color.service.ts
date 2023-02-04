import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from '../entity/color.entity';
import { Repository } from 'typeorm';
import { CreateColorDto } from '../dto/color.dto';
import { ColorExistException, ColorNotFoundException } from '../exception/color.exception';

@Injectable()
export class ColorService {
  constructor(@InjectRepository(Color) private colorRepository: Repository<Color>) {
  }

  async create(dto: CreateColorDto): Promise<{ id: number }> {
    const candidate = await this.colorRepository.findOne({ where: { title: dto.title } });
    if (candidate) {
      throw new ColorExistException();
    }
    const color = await this.colorRepository.save({ ...dto });
    return { id: color.id };
  }

  async getById(id: number): Promise<Color> {
    const color = await this.colorRepository.findOne({ where: { id } });
    if (!color) {
      throw new ColorNotFoundException();
    }
    return color;
  }

  async getList(): Promise<Color[]> {
    return await this.colorRepository.find();
  }

  async deleteColor(id: number) {
    await this.colorRepository.delete({ id });
  }
}