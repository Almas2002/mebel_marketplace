import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { User } from '../user/user.entity';

export enum PaymentType {
  PAY = 'pay',
  PAYOUT = 'payout',
  TRANSFER = 'transfer'
}

export enum PaymentMethod {
  ECOM = 'ecom',
  MC = 'mc'
}

export enum PaymentStatus {
  CREATE = 'create',
  REFUNDED = 'refunded',
  CANCELED = 'canceled',
  NEEDAPPROVE = 'need_approve',
  HOLD = 'hold',
  CLEARING = 'clearing',
  WITHDRAW = 'withdraw',
  REFILL = 'refill',
  PROCESSING = 'processing',
  ERROR = 'error',
  CHARGEBACK = 'chargeback',
  PARTIALREFUND = 'partial_refund',
  PARTIALCLEARING = 'partial_clearing'
}

export enum PaymentCurrency{
  KZT= "KZT"
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Order, order => order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => User, user => user)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  paymentId: string;
  @Column({ enum: PaymentCurrency, default: PaymentCurrency.KZT })
  currency:PaymentCurrency
  @Column({ enum: PaymentMethod, default: PaymentMethod.ECOM })
  paymentMethod: PaymentMethod;
  @Column({ enum: PaymentType, default: PaymentType.PAY })
  payment_type: PaymentType;
  @Column({ enum: PaymentStatus, default: PaymentStatus.CREATE })
  paymentStatus: PaymentStatus;

  @CreateDateColumn()
  createdAt:Date
}