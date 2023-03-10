import { InjectRepository } from '@nestjs/typeorm';
import { Market } from './market.entity';
import { Repository } from 'typeorm';
import { CreateMarketDto, QueryMarket, UpdateMarketDto } from './market.dto';
import { MarketExistException, MarketNotFoundException } from './market.exception';
import { FileService } from '../file/file.service';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class MarketService {
  constructor(@InjectRepository(Market) private marketRepository: Repository<Market>, private fileService: FileService) {
  }

  async create(dto: CreateMarketDto, userId: number, file: any): Promise<{ id: number }> {
    const candidateMarket = await this.getMarketByTitle(dto.title);
    if (candidateMarket) {
      throw new MarketExistException();
    }
    const candidateUser = await this.marketRepository.findOne({where:{user:{id:userId}}})
    if (candidateUser){
      throw new HttpException("у этого пользователя уже есть магазин",400)
    }
    let fileName = ''
    if (file){
      fileName = await this.fileService.createFile(file);
    }
    const market = await this.marketRepository.save({
      user: { id: userId },
      imageUrl: fileName,
      city: { id: dto.cityId }, ...dto,
    });
    return { id: market.id };
  }

  async getMarketByTitle(title: string) {
    const market = this.marketRepository.findOne({ where: { title } });
    if (!market){
      throw new MarketNotFoundException()
    }
    return market
  }

  async getMarketByUserId(id:number){
    const market =  await this.marketRepository.findOne({where:{user:{id}}})
    if (!market){
      throw new HttpException("магазин не найден",404)
    }
    return market
  }

  async get(dto: QueryMarket): Promise<{ data: Market[], count: number }> {
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;
    const query = await this.marketRepository.createQueryBuilder('market');

    if (dto?.userId) {
      query.andWhere('market.user_id = :userId', { userId: dto.userId });
    }
    if (dto?.title) {
      query.andWhere('market.title ILIKE :title ', { title: `%${dto.title}%` });
    }

    query.limit(limit);
    query.offset(offset);

    const data = await query.getManyAndCount();
    return { data: data[0], count: data[1] };
  }

  async update(marketId: number, dto: UpdateMarketDto, userId: number, file: any) {
    const market = await this.marketRepository.findOne({ where: { id: marketId, user: { id: userId } } });
    if (market.title != dto.title){
      const candidateMarket = await this.getMarketByTitle(dto.title);
      if (candidateMarket) {
        throw new MarketExistException();
      }
    }
    let fileName = market.imageUrl;
    if (file) {
      fileName = await this.fileService.createFile(file);
    }
    await this.marketRepository.update({ id: marketId }, { imageUrl: fileName, ...dto });
    return;
  }

  async  getAllForAdmins(dto: QueryMarket){
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;
    const query = await this.marketRepository.createQueryBuilder('market');

    if (dto?.userId) {
      query.andWhere('market.user_id = :userId', { userId: dto.userId });
    }
    query.limit(limit);
    query.offset(offset);

    const data = await query.getManyAndCount();
    return { data: data[0], count: data[1] };
  }
}