import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entity/region.entity';
import { Repository } from 'typeorm';
import { City } from './entity/city.entity';
import { CreateRegionDto } from './dto/region.dto';
import { RegionExistException, RegionNotFoundException } from './exception/region.exception';
import { CreateCityDto } from './dto/city.dto';
import { CityExistException, CityNotFoundException } from './exception/city.exception';

export class RegionService {
  constructor(@InjectRepository(Region) private regionRepository: Repository<Region>,
              @InjectRepository(City) private cityRepository: Repository<City>) {
  }

  async createRegion(dto: CreateRegionDto): Promise<{ id: number }> {
    const candidate = await this.getRegionByValue(dto.title);
    if (candidate) {
      throw new RegionExistException();
    }
    const region = await this.regionRepository.save({ title: dto.title });
    return { id: region.id };
  }

  private async getRegionByValue(title: string): Promise<Region> {
    return this.regionRepository.findOne({ where: { title } });
  }
  async deleteRegion(id:number){
    await this.regionRepository.delete({id})
  }
  async deleteCity(id:number){
    await this.cityRepository.delete({id})
  }
  async getRegions(): Promise<Region[]> {
    return this.regionRepository.find({ relations: ['cities'] });
  }

  async createCity(dto: CreateCityDto): Promise<{ id: number }> {
    const candidate = await this.cityRepository.findOne({ where: { title: dto.title } });
    if (candidate) {
      throw  new CityExistException();
    }
    const region = await this.regionRepository.findOne({ where: { id: dto.regionId } });
    if (!region) {
      throw new RegionNotFoundException();
    }
    const city = await this.cityRepository.save({ title: dto.title, region });
    return { id: city.id };
  }

  async findOneCityById(id: number): Promise<City> {
    const city = this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new CityNotFoundException();
    }
    return city;
  }
}