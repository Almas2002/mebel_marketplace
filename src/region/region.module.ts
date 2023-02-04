import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entity/region.entity';
import { City } from './entity/city.entity';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';

@Module({
  controllers:[RegionController],
  imports:[TypeOrmModule.forFeature([Region,City])],
  providers:[RegionService],
  exports:[RegionService]
})
export class RegionModule{

}