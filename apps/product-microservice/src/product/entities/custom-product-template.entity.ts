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
import { CustomProperty } from './custom-property.entity';

@Entity('custom_product_template')
export class CustomProductTemplate implements BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'user_id',
    type: 'char',
    length: 36,
  })
  userId: string;

  @Column({
    name: 'example_image_links',
    type: 'json',
  })
  exampleImageLinks: string[];

  @Column({
    name: 'product_type',
    type: 'char',
    length: 36,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  productType: string;

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

  @OneToMany(() => CustomProperty, (p) => p.customProductTemplate, {
    cascade: true,
  })
  properties: CustomProperty[];
}
