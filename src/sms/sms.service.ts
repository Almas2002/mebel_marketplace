import { HttpException, Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Sms} from "./sms.entity";
import {Repository} from "typeorm";
import {SendMessageService} from "./service/send-message.service"
import { CheckSmsDto } from './dto/create-sms.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class SmsService {
  constructor(@InjectRepository(Sms) private smsRepository: Repository<Sms>,private userService:UserService) {}

  async createSMSPhone(phone: string) {
    const user = await this.userService.getUserByPhoneNumber(phone)
    if (user){
      throw new HttpException("пользователь с таким телефоном уже есть",400)
    }
    const code = SmsService.genericRandomNumbers(9999, 1000)
    console.log(code);
    const candidate = await this.smsRepository.findOne({where:{phone}})
    if (candidate) {
      await this.smsRepository.delete({phone})
    }
    const {data} = await SendMessageService.sendCode(phone, code)
    if (data.error) {
      return data
    }
    await this.smsRepository.save({phone, code})
    return data


  }

  private static genericRandomNumbers(max: number, min: number) {
    return Math.floor((Math.random() * (max - min) + min))
  }

  async checkCode(dto: CheckSmsDto) {
    const sms = await this.smsRepository.findOne({where: {phone: dto.phone, code: dto.code}})
    if (sms) {
      await this.smsRepository.delete({phone: dto.phone})
      return {message: "ok"}
    }
    return {message: "error"}
  }
}
