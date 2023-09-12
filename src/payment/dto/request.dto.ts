import { PaymentCurrency, PaymentMethod, PaymentType } from '../payment.entity';

export class RequestDto {
  amount: number;
  currency: PaymentCurrency;
  orderId: number;
  description: string;
  paymentType: PaymentType;
  paymentMethod: PaymentMethod;
  items: Item[];
}

export class ResponseDto {
  payment_page_url: string;
}

export class Item {
  merchant_id: string;
  service_id: string;
  name: string;
  quantity: number;
  amount_one_pcs: number;
  amount_sum: number;
}

export class CreatePaymentRequest {

}

export function convertRequestPayment(dto: RequestDto) {
  return {
    amount: dto.amount,
    currency: dto.currency,
    order_id: `${dto.orderId}`,
    description: 'loom',
    payment_type: dto.paymentType,
    payment_method: dto.paymentMethod,
    items: dto.items,
    'payment_lifetime': 3600,
    'success_url': `https://api.loom.kz/order/success/${dto.orderId}`,
    'failure_url': `https://api.loom.kz/order/failure/${dto.orderId}`,
    'callback_url': `https://api.loom.kz/order/callback/${dto.orderId}`,
    'create_recurrent_profile': false,
    'recurrent_profile_lifetime': 0,
    'lang': 'ru',
  };
}
