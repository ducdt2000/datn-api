import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Property } from './property.entity';
import { Warehouse } from './warehouse.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'product_id',
    type: 'char',
    length: 36,
  })
  productId: string;

  @Column({
    name: 'warehouse_id',
    type: 'char',
    length: 36,
  })
  warehouseId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  name: string;

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
    name: 'code',
    type: 'varchar',
    length: 20,
  })
  code: string;

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

  @OneToMany(() => Property, (property) => property.item)
  properties: Property[];

  @ManyToOne(() => Warehouse, (log) => log.items)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;
}
