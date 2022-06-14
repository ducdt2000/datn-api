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
import { Item } from './item.entity';

@Entity('properties')
export class Property implements BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'item_id',
    type: 'char',
    length: 36,
  })
  itemId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  name: string;

  @Column({
    name: 'value',
    type: 'varchar',
    length: 50,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  value: string;

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

  @ManyToOne(() => Item, (item) => item.properties)
  @JoinColumn({
    name: 'item_id',
  })
  item: Item;
}
