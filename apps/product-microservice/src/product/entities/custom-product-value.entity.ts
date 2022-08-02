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
import { BaseEntity } from '../../../../../shared/entities/base.entity';
import { CustomProperty } from './custom-property.entity';

@Entity('custom_product_values')
export class CustomProductValue implements BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'property_id',
    type: 'int',
  })
  propertyId: number;

  @Column({
    name: 'value',
    type: 'varchar',
    length: 100,
    charset: 'utf8',
    collation: 'utf8_general_ci',
    nullable: true,
  })
  value?: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  description?: string;

  @Column({
    name: 'image_link',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  imageLink?: string;

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

  @ManyToOne(() => CustomProperty)
  @JoinColumn({ name: 'property_id' })
  property: CustomProperty;
}
