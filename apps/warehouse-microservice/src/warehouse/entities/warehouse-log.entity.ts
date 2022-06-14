import { ItemLog } from './item-log.entity';
import { Warehouse } from './warehouse.entity';
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

@Entity('warehouse_logs')
export class WarehouseLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
    type: 'char',
    length: 36,
  })
  userId: string;

  @Column({
    name: 'warehouse_id',
    type: 'char',
    length: 36,
  })
  warehouseId: string;

  @Column({
    name: 'type',
    type: 'tinyint',
  })
  type: number;

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

  @OneToMany(() => ItemLog, (item) => item.warehouseLog, { cascade: true })
  itemLogs: ItemLog[];

  @ManyToOne(() => Warehouse, (wh) => wh.warehouseLogs)
  @JoinColumn({
    name: 'warehouse_id',
  })
  warehouse: Warehouse;
}
