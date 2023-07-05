import { forwardRef, Module } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sms } from './sms.entity';
import { FileModule } from '../file/file.module';
require('dotenv').config()
@Module({
  controllers:[SmsController],
  imports:[TypeOrmModule.forFeature([Sms])],
  exports:[SmsService],
  providers:[SmsService]
})
export class SmsModule {}