import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from './banner.entity';
import { Repository } from 'typeorm';
import { CreateBannerDto } from './banner.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class BannerService {
  constructor(@InjectRepository(Banner) private bannerRepository: Repository<Banner>, private fileService: FileService) {
  }

  async create(dto: CreateBannerDto, file: any): Promise<{ id: number }> {
    const fileName = await this.fileService.createFile(file);
    const banner = await this.bannerRepository.save({ imageUrl: fileName, ...dto });
    return { id: banner.id };
  }

  async get() {
   return this.bannerRepository.find()
  }
}