import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { OrderMarket, StatusOfOrder } from './order-market.entity';
import { CartItemService } from '../cart/service/cart-item.service';
import { CreateOrderDto, OrderMarketQuery, OrderQuery } from './order.dto';
import { CartService } from '../cart/service/cart.service';
import { Product } from '../product/product.entity';
import { Item, RequestDto } from '../payment/dto/request.dto';
import { PaymentService } from '../payment/payment.service';
import { PaymentCurrency, PaymentMethod, PaymentType } from '../payment/payment.entity';

require('dotenv').config();

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
              @InjectRepository(OrderMarket) private orderMarket: Repository<OrderMarket>,
              private cartItemService: CartItemService, private cartService: CartService, private paymentService: PaymentService) {
  }

  async createOrder(dto: CreateOrderDto, id: number): Promise<{ success: boolean, url: string, paymentId: number }> {
    const cart = await this.cartService.getCardWithUserId(id);

    let product: Product;
    let order: Order;
    let totalPrice: number = 0;
    let discount;
    const orderProducts = await this.cartItemService.getCartItemsFotCart(id);
    if (!orderProducts.length) {
      throw new HttpException('У вас нету товаров в корзине', 400);
    }
    const items: Item[] = [];
    order = await this.orderRepository.save({
      cart, city: { id: dto.cityId },
      address: dto.address, apartment: dto.apartment, building: dto.building, phone: dto.phone,
    });

    const merchant_id = process.env.ONEVISIONMID;
    const service_id = process.env.ONEVISIONSID;

    let orderMarket: OrderMarket = null;
    for (let i = 0; i < orderProducts.length; i++) {
      product = orderProducts[i].product;
      discount = product.discount === 0 ? 1 : product.discount / 100;

      let cartItemTotalPrice = (product.price * orderProducts[i].qty) * (1 - product.discount / 100);

      totalPrice += cartItemTotalPrice;
      items.push({
        amount_one_pcs: product.price  * (1 - product.discount / 100),
        amount_sum: cartItemTotalPrice ,
        merchant_id,
        name: product.title,
        quantity: orderProducts[i].qty,
        service_id,
      });


      orderMarket = await this.orderMarket.findOne({ where: { market: product.market, order: order } });
      if (orderMarket) {
        await this.cartItemService.updateCartItemToOrder(orderProducts[i].id, orderMarket);
        await this.orderMarket.update({ id: orderMarket.id }, { totalPrice: orderMarket.totalPrice + (product.price * orderProducts[i].qty) * (1 - product.discount / 100) });
      } else {
        orderMarket = await this.orderMarket.save({ market: product.market, order: order });
        await this.cartItemService.updateCartItemToOrder(orderProducts[i].id, orderMarket);
        await this.orderMarket.update({ id: orderMarket.id }, { totalPrice: orderMarket.totalPrice + (product.price * orderProducts[i].qty) * (1 - product.discount / 100) });
      }

    }
    if (totalPrice === 0) {
      await this.orderRepository.delete({ id: order.id });
      throw new HttpException('Сумма должна быть больше чем 0', 400);
    }
    await this.orderRepository.update({ id: order.id }, { totalPrice: totalPrice });

    const dataObject: RequestDto = {
      items,
      paymentMethod: PaymentMethod.ECOM,
      paymentType: PaymentType.PAY,
      description: '',
      orderId: order.id,
      currency: PaymentCurrency.KZT,
      amount: totalPrice,
    };
    return this.paymentService.create(dataObject)
  }

  async getOrderById(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['marketOrders', 'marketOrders.items', 'marketOrders.market', 'marketOrders.items.product', 'marketOrders.items.product.images'],
    });
  }
  async success(id:number){
    await this.orderMarket.update({order:{id}},{status:StatusOfOrder.PAYMENT})
  }

  async getOrdersToMarket(dto: OrderMarketQuery, userId: number) {
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;
    const query = this.orderMarket.createQueryBuilder('order')
      .leftJoin('order.market', 'market')
      .where('market.user_id = :userId', { userId })
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .leftJoinAndSelect('product.images', 'images');
    if (dto?.status) {
      query.andWhere('order.status = :status', { status: dto.status });
    }

    query.limit(limit);
    query.offset(offset);

    const data = await query.getManyAndCount();
    return { data: data[0], count: data[1] };

  }

  async getOrdersToMarketOne(id: number) {
    return await this.orderMarket.findOne({ where: { id }, relations: ['items', 'items.product'] });
  }

  async getOrdersMarketUpdate(id: number, status: StatusOfOrder) {
    await this.orderMarket.update({ id }, { status });
  }

  async getOrder(dto: OrderQuery, userId: number): Promise<{ data: Order[], count: number }> {
    const cart = await this.cartService.getCardWithUserId(userId);
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;

    const query = await this.orderRepository.createQueryBuilder('order')
      .andWhere('order.cartId = :cartId', { cartId: cart.id })
      .leftJoinAndSelect('order.marketOrders', 'marketOrders')
      .leftJoinAndSelect('marketOrders.items', 'items')
      .leftJoinAndSelect('items.product', 'product');
    query.limit(limit);
    query.offset(offset);

    const data = await query.getManyAndCount();
    return { data: data[0], count: data[1] };
  }

}