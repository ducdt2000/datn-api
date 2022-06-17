import { Order } from './order.entity';
import { BaseEntity } from './../../../../../shared/entities/base.entity';
import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('order_logs')
export class OrderLog implements BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'order_id',
    type: 'char',
    length: 36,
  })
  orderId: string;

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
    name: 'status',
    type: 'int',
  })
  status: number;

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

  @ManyToOne(() => Order, (order) => order.orderLogs)
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;
}
