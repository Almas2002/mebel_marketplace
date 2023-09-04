import axios from 'axios';
require("dotenv").config()

export class PaymentServiceRequest {
  private static paymentCreateUrl = '/payment/create';

  static async create(dto: { sign: any, data: any }, token: any) {

    return await axios.post<{ data: string, payment_id: number, success: boolean }>(process.env.ONEVISIONURL+this.paymentCreateUrl, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
