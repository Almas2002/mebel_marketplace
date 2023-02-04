import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';

@Module({
  providers:[FileService],
  imports:[TypeOrmModule.forFeature([Image])],
  exports:[FileService]
})
export class FileModule{}