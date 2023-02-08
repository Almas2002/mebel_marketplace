import { Module } from '@nestjs/common';
import { FeedbackProductService } from './service/feedback-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackProduct } from './feedback-product.entity';
import { FeedbackComment } from './feedback-comment.entity';
import { FeedbackController } from './feedback.controller';
import { FeedbackCommentService } from './service/feedback-comment.service';

@Module({
  providers:[FeedbackProductService,FeedbackCommentService],
  imports:[TypeOrmModule.forFeature([FeedbackProduct,FeedbackComment])],
  controllers:[FeedbackController],
  exports:[FeedbackProductService]
})
export class FeedbackModule{}