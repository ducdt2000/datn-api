import { Order } from '../../order/entities/order.entity';
import { BaseEntity } from 'shared/entities/base.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('payment_methods')
export class DeliveryMethod implements BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    name: 'organization',
    type: 'varchar',
    length: 50,
  })
  organization: string;

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

  @OneToMany(() => Order, (order) => order.deliveryMethod)
  orders: Order[];
}
