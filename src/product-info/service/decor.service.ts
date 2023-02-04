import { InjectRepository } from '@nestjs/typeorm';
import { Decor } from '../entity/decor.entity';
import { Repository } from 'typeorm';
import { CreateDecorDto } from '../dto/decor.dto';
import { DecorExistsException, DecorNotFoundException } from '../exception/decor.exception';

export class DecorService {
  constructor(@InjectRepository(Decor) private decorRepository: Repository<Decor>) {
  }

  async create(dto: CreateDecorDto): Promise<{ id: number }> {
    const candidate = await this.decorRepository.findOne({ where: { title: dto.title } });
    if (candidate) {
      throw new DecorExistsException();
    }
    const decor = await this.decorRepository.save({ title: dto.title });
    return { id: decor.id };
  }

  async getById(id: number) {
    const decor = await this.decorRepository.findOne({ where: { id } });
    if (!decor) {
      throw new DecorNotFoundException();
    }
    return decor;
  }

  async getList(): Promise<Decor[]> {
    return this.decorRepository.find();
  }

  async deleteDecor(id: number) {
    await this.decorRepository.delete({ id });
  }

}