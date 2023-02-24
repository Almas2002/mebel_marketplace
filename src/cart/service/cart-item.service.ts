import { Module } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '../entity/cart-item.entity';
import { Repository } from 'typeorm';
import { CartService } from './cart.service';
import { CreateCartItemDto } from '../cart.dto';


export class CartItemService{
  constructor(@InjectRepository(CartItem) private cartItemRepository:Repository<CartItem>,private cartService:CartService) {}


  async create(dto:CreateCartItemDto,userId:number){
    const cart = await this.cartService.getCardWithUserId(userId)
    let totalPrice = 0;
    for (let item of dto.carts){
      totalPrice += item.totalPrice
      await this.cartItemRepository.save({cart,product:{id:item.productId},qty:item.qty})
    }
    await this.cartService.updateTotalPrice(cart.id,totalPrice)
  }


  async getCartItemsFotCart(userId:number) {
    const cart = await this.cartService.getCardWithUserId(userId)
    const query = await this.cartItemRepository.createQueryBuilder("items")
      .leftJoinAndSelect("items.product","product")
      .where("items.cart_id = :cartId", { cartId: cart.id })
      .andWhere("items.order_id IS NULL")

    return await query.getRawMany()
  }

}