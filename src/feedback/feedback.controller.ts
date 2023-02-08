import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FeedbackCommentService } from './service/feedback-comment.service';
import { CreateFeedbackDto, GetFeedbacksQuery } from './feedback.dto';
import { UserDecorator } from '../decorators/user.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';

@ApiTags("feedback")
@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackComment: FeedbackCommentService) {
  }

  @ApiQuery({name:"productId",required:true,type:"number"})
  @ApiQuery({name:"limit",required:false,type:"number"})
  @ApiQuery({name:"page",required:false,type:"number"})
  @Get()
  get(@Query()query: GetFeedbacksQuery) {
    return this.feedbackComment.getCommentsOnProduct(query);
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @Post()
  create(@Body()dto: CreateFeedbackDto, @UserDecorator('id')id: number) {
    return this.feedbackComment.create(dto, id);
  }
}