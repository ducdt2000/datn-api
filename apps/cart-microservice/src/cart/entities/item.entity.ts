import { Cart } from './cart.entity';
import { BaseEntity } from 'shared/entities/base.entity';
import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { Property } from './property.entity';

@Entity('items')
export class Item implements BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'cart_id',
    type: 'char',
    length: 36,
  })
  cartId: string;

  @Column({
    name: 'product_id',
    type: 'char',
    length: 36,
  })
  productId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 20,
  })
  code: string;

  @Column({
    name: 'price',
    type: 'decimal',
  })
  price: number;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    name: 'amount',
    type: 'int',
  })
  amount: number;

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

  @OneToMany(() => Property, (property) => property.item, { cascade: true })
  properties: Property[];

  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn({
    name: 'cart_id',
  })
  cart: Cart;
}
