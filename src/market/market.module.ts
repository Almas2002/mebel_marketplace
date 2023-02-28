import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Market } from './market.entity';
import { FileModule } from '../file/file.module';
import { MarketController } from './market.controller';

@Module({
  providers:[MarketService],
  imports:[TypeOrmModule.forFeature([Market]),FileModule],
  controllers:[MarketController],
  exports:[MarketService]
})
export class MarketModule{

}