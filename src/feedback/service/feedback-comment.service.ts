import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackComment } from '../feedback-comment.entity';
import { Repository } from 'typeorm';
import { FeedbackProductService } from './feedback-product.service';
import { CreateFeedbackDto, GetFeedbacksQuery } from '../feedback.dto';
import { ProductNotFoundException } from '../../product/product.exception';
import { Profile } from '../../profile/profile.entity';

@Injectable()
export class FeedbackCommentService {
  constructor(@InjectRepository(FeedbackComment) private feedbackCommentRepository: Repository<FeedbackComment>,
              private feedbackProductService: FeedbackProductService) {
  }

  async create(dto: CreateFeedbackDto, userId: number) {
    console.log(userId);
    const product = await this.feedbackProductService.get(dto.productId);
    if (!product) {
      throw new ProductNotFoundException();
    }
    await this.feedbackCommentRepository.save({ product: { id: dto.productId }, user: { id: userId }, ...dto });
    const count = product.commentCount + 1;
    const sum = await this.avg(dto.productId);
    await this.feedbackProductService.update(dto.productId, count, sum.avg);
  }

  private async avg(productId: number): Promise<{ avg: number }> {
    return await this.feedbackCommentRepository.createQueryBuilder('comment')
      .select('AVG(comment.star)', 'avg')
      .andWhere('comment.product_id = :productId', { productId })
      .getRawOne();
  }

  async getCommentsOnProduct(dto: GetFeedbacksQuery): Promise<{ data: FeedbackComment[]}> {
    if (!dto?.productId || !dto){
      throw new HttpException("индентификатор продукта не указан",400)
    }
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;

    const query = await this.feedbackCommentRepository.createQueryBuilder('comment')
      .leftJoinAndSelect("comment.user","profile",)
      .leftJoinAndSelect("profile","profile")
    query.limit(limit);
    query.offset(offset);

    const data = await query.getMany();
    return {data} ;
  }

}