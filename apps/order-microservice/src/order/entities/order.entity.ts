import { DeliveryMethod } from './../../order-method/entities/delivery-method.entity';
import { PaymentMethod } from './../../order-method/entities/payment-method.entity';
import { OrderLog } from './order-log.entity';
import { BaseEntity } from './../../../../../shared/entities/base.entity';
import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Item } from './item.entity';

@Entity('orders')
export class Order implements BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
    type: 'char',
    length: 36,
  })
  userId: string;

  @Column({
    name: 'warehouse_id',
    type: 'char',
    length: 36,
  })
  warehouseId: string;

  @Column({
    name: 'payment_method_id',
    type: 'int',
  })
  paymentMethodId: number;

  @Column({
    name: 'delivery_method_id',
    type: 'int',
  })
  deliveryMethodId: number;

  @Column({
    name: 'delivery_time',
    type: 'datetime',
  })
  deliveryTime: Date;

  @Column({
    name: 'bill',
    type: 'decimal',
  })
  bill: number;

  @Column({
    name: 'status',
    type: 'int',
  })
  status: number;

  @Column({
    name: 'address',
    type: 'varchar',
    length: 100,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  address: string;

  @Column({
    name: 'city',
    type: 'varchar',
    length: 20,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  city: string;

  @Column({
    name: 'district',
    type: 'varchar',
    length: 20,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  district: string;

  @Column({
    name: 'message',
    type: 'text',
    nullable: true,
  })
  message?: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 20,
  })
  phone: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true,
    name: 'deleted_at',
  })
  deletedAt?: Date;

  @OneToMany(() => Item, (item) => item.order)
  items: Item[];

  @OneToMany(() => OrderLog, (orderLog) => orderLog.order)
  orderLogs: OrderLog[];

  @ManyToOne(() => PaymentMethod, (method) => method.orders)
  @JoinColumn({
    name: 'payment_method_id',
  })
  paymentMethod: PaymentMethod;

  @ManyToOne(() => DeliveryMethod, (method) => method.orders)
  @JoinColumn({
    name: 'delivery_method_id',
  })
  deliveryMethod: DeliveryMethod;
}
