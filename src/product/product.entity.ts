import { Category } from '../category/category.entity';
import { Image } from '../file/image.entity';
import {
  Column,
  Entity,
  JoinColumn, JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Market } from '../market/market.entity';
import { FeedbackComment } from '../feedback/feedback-comment.entity';
import { FeedbackProduct } from '../feedback/feedback-product.entity';
import { Profile } from '../profile/profile.entity';
import { City } from '../region/entity/city.entity';
import { Color } from '../product-info/entity/color.entity';
import { ProductInfo } from '../product-info/entity/product-info.entity';
import { CartItem } from '../cart/entity/cart-item.entity';

const PRODUCTS_FAVORITE = 'products_favorite';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  price: number;
  @Column({ default: 0 })
  discount: number;
  @Column({ default: '' })
  description: string;
  @ManyToOne(() => Category, category => category.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => City, city => city.products)
  city: City;
  @OneToMany(() => Image, image => image.product, { onDelete: 'CASCADE' })
  images: Image[];

  @ManyToOne(() => Market, market => market.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'market_id' })
  market: Market;

  @OneToMany(() => FeedbackComment, feedback => feedback.product)
  feedbacks: FeedbackComment[];

  @OneToOne(() => FeedbackProduct, feedback => feedback.product)
  status: FeedbackProduct;

  @ManyToMany(() => Profile, profile => profile.favorites)
  @JoinTable({ name: PRODUCTS_FAVORITE })
  profilesLike: Profile;

  @ManyToMany(() => Color, color => color.products)
  @JoinTable({ name: 'product_colors' })
  colors: Color[];

  @OneToOne(() => ProductInfo, info => info.product)
  info: ProductInfo;

  @OneToMany(()=>CartItem,item=>item.product)
  cariItems:CartItem []

  @Column({default:false})
  confirm:boolean


}