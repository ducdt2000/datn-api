import { BaseEntity } from './../../../../../shared/entities/base.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('properties')
export class Property implements BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'product_id',
    type: 'char',
    length: 36,
  })
  productId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  name: string;

  @Column({
    name: 'values',
    type: 'json',
  })
  values: any[];

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

  @ManyToOne(() => Product, (p) => p.properties)
  @JoinColumn({
    name: 'product_id'
  })
  product: Product;
}
