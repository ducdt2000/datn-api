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
import { CustomProductValue } from './custom-product-value.entity';

@Entity('custom_properties')
export class CustomProperty implements BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  name: string;

  @Column({
    name: 'template_id',
    type: 'int',
  })
  templateId: number;

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

  @ManyToOne(() => CustomProductTemplate, (c) => c.properties)
  @JoinColumn({ name: 'template_id' })
  customProductTemplate: CustomProductTemplate;

  @OneToMany(() => CustomProductValue, (v) => v.property, { cascade: true })
  values: CustomProductValue[];
}
