import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Repository } from 'typeorm';
import { Product } from '../product/product.entity';

@Injectable()
export class FileService {
  constructor(@InjectRepository(Image) private imageRepository: Repository<Image>) {
  }

  async createFile(file: any): Promise<string> {
    try {
      let fileName = v4();
      const { originalname } = file;
      const format = originalname.split('.');
      fileName = fileName + '.' + format[format.length - 1];
      //await this.s3_upload(file.buffer, this.bucket, fileName, file.mimetype)
      return fileName;
    } catch (e) {
      console.log(e);
    }
  }


  async createImageForProduct(fileName: string, product: Product): Promise<void> {
    await this.imageRepository.save({ imageUrl: fileName, product });
  }

  async deleteImage(id:number){
    await this.imageRepository.delete({id})
  }

}