import { Product } from './product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity('product_versions')
export class ProductVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    name: 'product_id',
    type: 'char',
    length: 36,
  })
  productId: string;

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
    name: 'image_links',
    type: 'json',
  })
  imageLinks: string[];

  @Column({
    name: 'default_image',
    type: 'varchar',
    length: 200,
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

  @ManyToMany(() => Property, (p) => p.productVersions)
  @JoinTable({
    name: 'product_version_properties',
    joinColumn: {
      name: 'product_version_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'property_id',
      referencedColumnName: 'id',
    },
  })
  properties: Property[];

  @ManyToOne(() => Product, (p) => p.productVersions)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;
}
