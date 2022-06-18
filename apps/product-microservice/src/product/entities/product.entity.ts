import { BaseEntity } from './../../../../../shared/entities/base.entity';
import { Brand } from './brand.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductType } from './product-type.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Property } from './property.entity';

@Entity('products')
export class Product implements BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  name: string;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 20,
  })
  code: string;

  @Column({
    name: 'product_type_id',
    type: 'char',
    length: 36,
  })
  productTypeId: string;

  @Column({
    name: 'star_point',
    type: 'decimal',
    default: 0,
  })
  starPoint: number;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  description?: string;

  @Column({
    name: 'slug',
    type: 'varchar',
    length: 50,
  })
  slug: string;

  @Column({
    name: 'brand_id',
    type: 'char',
    length: 36,
  })
  brandId: string;

  @Column({
    name: 'price',
    type: 'decimal',
  })
  price: number;

  @Column({
    name: 'image_links',
    type: 'json',
  })
  imageLinks: string[];

  @Column({
    name: 'default_image',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  defaultImageLink: string;

  @Column({
    name: 'count_in_stock',
    type: 'int',
  })
  countInStock: number;

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

  @ManyToOne(() => ProductType)
  @JoinColumn({
    name: 'product_type_id',
  })
  productType: ProductType;

  @ManyToOne(() => Brand, (b) => b.products)
  @JoinColumn({
    name: 'brand_id',
  })
  brand: Brand;

  @OneToMany(() => Comment, (c) => c.product)
  comments: Comment[];

  @OneToMany(() => Property, (p) => p.product, { cascade: true })
  properties: Property[];
}
