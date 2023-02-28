import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '../entity/cart-item.entity';
import { Repository } from 'typeorm';
import { CartService } from './cart.service';
import { ProductService } from '../../product/product.service';
import { CartItemDto } from '../cart.dto';
import { OrderMarket } from '../../order/order-market.entity';


export class CartItemService {
  constructor(@InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>, private cartService: CartService, private productService: ProductService) {
  }


  async create(dto: CartItemDto, userId: number): Promise<{ id: number }> {
    const cart = await this.cartService.getCardWithUserId(userId);
    const product = await this.productService.getProductById(dto.productId);
    let candidate: CartItem;
    const query = this.cartItemRepository.createQueryBuilder('item')
      .andWhere('item.cart_id = :cartId', { cartId: cart.id })
      .andWhere('item.product_id = :productId', { productId: product.id })
      .andWhere('item.order_id IS NULL');
    candidate = await query.getOne();
    if (candidate) {
      await this.plusQtyCartItem(candidate.id);
      return;
    }
    const totalPrice = (product.price * dto.qty) * (1 - product.discount / 100);
    const cartItem = await this.cartItemRepository.save({
      cart: { id: cart.id },
      product: { id: dto.productId },
      qty: dto.qty,
      totalPrice,
    });
    return { id: cartItem.id };
  }


  async getCartItemsFotCart(userId: number) {
    const cart = await this.cartService.getCardWithUserId(userId);
    const query = await this.cartItemRepository.createQueryBuilder('items')
      .leftJoinAndSelect('items.product', 'product')
      .leftJoinAndSelect('product.market', 'market')
      .where('items.cart_id = :cartId', { cartId: cart.id })
      .andWhere('items.order_id IS NULL');

    return await query.getMany();
  }

  async updateCartItemToOrder(id: number, orderMarket: OrderMarket) {
    const item = await this.cartItemRepository.findOne({ where: { id } });
    item.orderMarket = orderMarket;
    await this.cartItemRepository.save(item);
  }


  async plusQtyCartItem(id: number) {
    const item = await this.cartItemRepository.findOne({ where: { id }, relations: ['cart'] });
    if (!item) {
      throw new HttpException('такой вещь не найден', 404);
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