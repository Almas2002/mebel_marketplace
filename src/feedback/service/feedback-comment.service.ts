import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackComment } from '../feedback-comment.entity';
import { Repository } from 'typeorm';
import { FeedbackProductService } from './feedback-product.service';
import { CreateFeedbackDto } from '../feedback.dto';
import { ProductNotFoundException } from '../../product/product.exception';

@Injectable()
export class FeedbackCommentService {
  constructor(@InjectRepository(FeedbackComment) private feedbackCommentRepository: Repository<FeedbackComment>,
              private feedbackProductService: FeedbackProductService) {
  }

  async create(dto: CreateFeedbackDto, userId: number) {
    const product = await this.feedbackProductService.get(dto.productId);
    if (!product) {
      throw new ProductNotFoundException();
    }
    await this.feedbackCommentRepository.save({ product: { id: dto.productId }, user: { id: userId }, ...dto });
    const count =  product.commentCount  + 1
    await this.feedbackProductService.update(dto.productId, count, 4);
  }
  async avg(productId:number){
    return await this.feedbackCommentRepository.createQueryBuilder("comment")
      .select("AVG(product.star)", "avg")
      .andWhere("comment.productId = :productId", { productId })
      .getOne()
  }
}