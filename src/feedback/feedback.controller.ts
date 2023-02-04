import { Controller, Get } from '@nestjs/common';
import { FeedbackCommentService } from './service/feedback-comment.service';

@Controller("feedback")
export class FeedbackController{
  constructor(private feedbackComment:FeedbackCommentService) {}


  @Get()
  get(){
    return this.feedbackComment.avg(1)
  }
}