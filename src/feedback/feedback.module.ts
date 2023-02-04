import { Module } from '@nestjs/common';
import { FeedbackProductService } from './service/feedback-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackProduct } from './feedback-product.entity';
import { FeedbackComment } from './feedback-comment.entity';

@Module({
  providers:[FeedbackProductService],
  imports:[TypeOrmModule.forFeature([FeedbackProduct,FeedbackComment])]
})
export class FeedbackModule{

}