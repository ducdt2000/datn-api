import { BaseEntity } from 'shared/entities/base.entity';
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
import { CustomProductTemplate } from './custom-product-template.entity';

@Entity('custom_products')
export class CustomProduct implements BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'user_id',
    type: 'char',
    length: 36,
  })
  userId: string;

  @Column({
    name: 'product_template_id',
    type: 'int',
  })
  productTemplateId: number;

  @Column({
    name: 'message',
    type: 'varchar',
    length: 200,
  })
  message: string;

  @Column({
    name: 'properties',
    type: 'json',
  })
  properties: any[];

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

  @ManyToOne(() => CustomProductTemplate)
  @JoinColumn({ name: 'product_template_id' })
  productTemplate: CustomProductTemplate;
}
