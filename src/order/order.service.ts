import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { OrderMarket } from './order-market.entity';
import { CartItemService } from '../cart/service/cart-item.service';
import { CreateOrderDto, OrderQuery } from './order.dto';
import { CartService } from '../cart/service/cart.service';
import { Product } from '../product/product.entity';
import { QueryMarket } from '../market/market.dto';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
              @InjectRepository(OrderMarket) private orderMarket: Repository<OrderMarket>,
              private cartItemService: CartItemService, private cartService: CartService) {
  }

  async createOrder(dto: CreateOrderDto, id: number): Promise<{ id: number }> {
    const cart = await this.cartService.getCardWithUserId(id);

    let product: Product;
    let order: Order;
    let totalPrice: number = 0;
    let discount;
    const orderProducts = await this.cartItemService.getCartItemsFotCart(id);
    if (!orderProducts.length) {
      throw new HttpException('У вас нету товаров в корзине', 400);
    }
    order = await this.orderRepository.save({ cart, city: { id: dto.cityId },
      address:dto.address,apartment:dto.apartment,building:dto.building,phone:dto.phone });

    let orderMarket: OrderMarket = null;
    for (let i = 0; i < orderProducts.length; i++) {
      product = orderProducts[i].product;
      discount = product.discount === 0 ? 1 : product.discount / 100;

      totalPrice += (product.price * orderProducts[i].qty) * (1 - product.discount / 100);
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
    return { id: order.id };
  }

  async getOrderById(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['marketOrders', 'marketOrders.items','marketOrders.market','marketOrders.items.product','marketOrders.items.product.images'],
    });
  }

  async getOrder(dto: OrderQuery, userId: number): Promise<{ data: Order[], count: number }> {
    const cart = await this.cartService.getCardWithUserId(userId);
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;

    const query = await this.orderRepository.createQueryBuilder('order')
      .andWhere('order.cartId = :cartId', { cartId: cart.id })
      .leftJoinAndSelect('order.marketOrders', 'marketOrders')
      .leftJoinAndSelect('marketOrders.items','items')
      .leftJoinAndSelect('items.product', 'product');
    query.limit(limit);
    query.offset(offset);

    const data = await query.getManyAndCount();
    return { data: data[0], count: data[1] };
  }

}