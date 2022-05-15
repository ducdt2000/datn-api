import { Brand } from './branch.entity';
import { ProductVersion } from './product-version.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductType } from './product-type.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
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
  })
  description?: string;

  @Column({
    name: 'slug',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  slug: string;

  @Column({
    name: 'default_version_id',
    type: 'char',
    length: 36,
  })
  defaultVersionId: string;

  @Column({
    name: 'brand_id',
    type: 'char',
    length: 36,
  })
  brandId: string;

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

  @OneToOne(() => ProductVersion)
  defaultProductVersion: ProductVersion;

  @OneToMany(() => ProductVersion, (pv) => pv.product)
  productVersions: ProductVersion[];

  @ManyToOne(() => Brand, (b) => b.products)
  @JoinColumn({
    name: 'brand_id',
  })
  brand: Brand;

  @OneToMany(() => Comment, (c) => c.product)
  comments: Comment[];
}