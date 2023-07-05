import { Body, Controller, Post } from '@nestjs/common';
import { SmsService } from './sms.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateSmsDto,CheckSmsDto } from './dto/create-sms.dto';

@ApiTags('SMS')
@Controller('sms')
export class SmsController {
  constructor(private smsService: SmsService) {
  }

  @Post('check')
  async check(@Body()dto: CheckSmsDto) {
    return this.smsService.checkCode(dto);
  }

  @Post('send-code')
  async sendCode(@Body()dto: CreateSmsDto) {
    return this.smsService.createSMSPhone(dto.phone );
  }
}