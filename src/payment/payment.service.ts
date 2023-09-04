import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Payment, PaymentStatus } from './payment.entity';
import { Repository } from 'typeorm';
import { convertRequestPayment, RequestDto, ResponseDto } from './dto/request.dto';
import { PaymentServiceRequest } from './payment.request';

require('dotenv').config();

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(Payment) private paymentRepository: Repository<Payment>) {
  }

  generateSign(data: any) {
    return crypto.createHmac('sha512', process.env.ONEVISIONSECRETKEY).update(data).digest('hex');
  }

  async create(dto: RequestDto): Promise<{ success: boolean, url: string, paymentId: number }> {
    const dataObject = convertRequestPayment(dto);

    const dataBase64 = this.generateData(JSON.stringify(dataObject));
    const sign = this.generateSign(dataBase64);
    const token = this.generateToken();
    const { data }  = await PaymentServiceRequest.create({ data: dataBase64, sign }, token);

    if (!data.success) {
      return { success: false, url: '', paymentId: 0 };
    }

    const buff = new Buffer(data.data, 'base64');
    const res: ResponseDto = JSON.parse(buff.toString('ascii'));
    await this.paymentRepository.save({
      currency: dto.currency,
      order: { id: dto.orderId },
      paymentId: `${data.payment_id}`,
      payment_type: dto.paymentType,
      paymentMethod: dto.paymentMethod,
    });

    return { success: true, url: res.payment_page_url, paymentId: data.payment_id };

  }

  generateData(data: string) {
    return Buffer.from(data).toString('base64');
  }

  generateToken() {
    console.log(process.env.ONEVISIONKEY);
    return Buffer.from(process.env.ONEVISIONKEY).toString('base64');
  }

}

