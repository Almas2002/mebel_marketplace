import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RegionService } from './region.service';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateRegionDto } from './dto/region.dto';
import { CreateCityDto } from './dto/city.dto';
import { Region } from './entity/region.entity';

@ApiTags('регион')
@Controller('region')
export class RegionController {
  constructor(private regionService: RegionService) {
  }

  @Post()
  createRegion(@Body()dto: CreateRegionDto): Promise<{ id: number }> {
    return this.regionService.createRegion(dto);
  }

  @Post('city')
  createCity(@Body()dto: CreateCityDto): Promise<{ id: number }> {
    return this.regionService.createCity(dto);
  }

  @Get()
  getListRegionsWithCity(): Promise<Region[]> {
    return this.regionService.getRegions();
  }

  @ApiOperation({ summary: 'удаление региона' })
  @Delete('/:id')
  deleteRegion(@Param('id')id: number) {
    return this.regionService.deleteRegion(id);
  }
  @ApiOperation({ summary: 'удаление города' })
  @Delete('/city/:id')
  deleteCity(@Param('id')id: number) {
    return this.regionService.deleteCity(id);
  }
}