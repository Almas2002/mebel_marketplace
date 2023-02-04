import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackProduct } from '../feedback-product.entity';
import { Repository } from 'typeorm';

export class FeedbackProductService {
  constructor(@InjectRepository(FeedbackProduct) private feedBackProduct: Repository<FeedbackProduct>) {}

  async create(id: number): Promise<FeedbackProduct> {
    return this.feedBackProduct.save({ product: { id } });
  }

  async update(productId:number,count:number,avg:number){
    await this.feedBackProduct.update({product:{id:productId}},{avg,commentCount:count})
  }

  async get(id:number): Promise<FeedbackProduct>{
    return await this.feedBackProduct.findOne({where:{product:{id}}})
  }
}