import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entity/cart.entity';

export enum ChangeTotalPrice {
  PRICE = 'PRICE',
  PLUS = 'PLUS'
}

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private cartService: Repository<Cart>,
  ) {
  }

  async create(id: number) {
    await this.cartService.save({ user: { id} });
  }

  async getCardWithUserId(id: number): Promise<Cart> {
    return this.cartService.findOne({ where: { user: { id } } });
  }

}