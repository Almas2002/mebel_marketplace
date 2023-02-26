import { HttpException, Module } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '../entity/cart-item.entity';
import { Repository } from 'typeorm';
import { CartService } from './cart.service';
import { ifError } from 'assert';
import { ProductService } from '../../product/product.service';
import { CartItemDto } from '../cart.dto';


export class CartItemService {
  constructor(@InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>, private cartService: CartService, private productService: ProductService) {
  }


  async create(dto: CartItemDto, userId: number) {
    const cart = await this.cartService.getCardWithUserId(userId);
    const product = await this.productService.getProductById(dto.productId);
    let candidate: CartItem;
    candidate = await this.cartItemRepository.findOne({
      where: {
        cart: cart,
        product: { id: dto.productId },
      },
    });
    if (candidate) {
      await this.plusQtyCartItem(candidate.id);
      return
    }
    const totalPrice = (product.price * dto.qty) * (1 - product.discount / 100);
    await this.cartItemRepository.save({ cart, product: { id: dto.productId }, qty: dto.qty, totalPrice });

  }


  async getCartItemsFotCart(userId: number) {
    const cart = await this.cartService.getCardWithUserId(userId);
    const query = await this.cartItemRepository.createQueryBuilder('items')
      .leftJoinAndSelect('items.product', 'product')
      .where('items.cart_id = :cartId', { cartId: cart.id })
      .andWhere('items.order_id IS NULL');

    return await query.getMany();
  }

  async plusQtyCartItem(id: number) {
    const item = await this.cartItemRepository.findOne({ where: { id }, relations: ['cart'] });
    if (!item){
      throw new HttpException("такой вещь не найден",404)
    }
    const price = (item.totalPrice / item.qty);
    item.totalPrice += price;
    item.qty += 1;
    await this.cartItemRepository.save(item);
  }

  async minceQryCartItem(id: number) {
    const item = await this.cartItemRepository.findOne({ where: { id }, relations: ['cart'] });
    if (item.qty == 1) {
      await this.deleteCartItem(item.id);
      return;
    }
    const price = item.totalPrice / item.qty;
    item.totalPrice -= price;
    item.qty -= 1;
    await this.cartItemRepository.save(item);

  }

  async deleteCartItem(id: number) {
    await this.cartItemRepository.delete({ id });
  }

}