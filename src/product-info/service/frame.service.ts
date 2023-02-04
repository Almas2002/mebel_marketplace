import { InjectRepository } from '@nestjs/typeorm';
import { Frame } from '../entity/frame.entity';
import { Repository } from 'typeorm';
import { CreateFrameDto } from '../dto/frame.dto';
import { FrameExistException } from '../exception/frame.exception';

export class FrameService {
  constructor(@InjectRepository(Frame) private frameRepository: Repository<Frame>) {
  }


  async create(dto: CreateFrameDto): Promise<{ id: number }> {
    const candidate = await this.frameRepository.findOne({ where: { title: dto.title } });
    if (candidate) {
      throw new FrameExistException();
    }
    const frame = await this.frameRepository.save({ title: dto.title });
    return { id: frame.id };
  }

  async getById(id: number) {
    const frame = await this.frameRepository.findOne({ where: { id } });
    if (!frame) {
      throw new FrameExistException();
    }
    return frame
  }

  async getList(): Promise<Frame[]> {
    return this.frameRepository.find();
  }

  async deleteFrame(id: number) {
    await this.frameRepository.delete({ id });
  }


}


