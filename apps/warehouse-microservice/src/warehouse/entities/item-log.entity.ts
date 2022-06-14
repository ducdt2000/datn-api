import { WarehouseLog } from './warehouse-log.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from './item.entity';

@Entity('item_logs')
export class ItemLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'warehouse_log_id',
    type: 'char',
    length: 36,
  })
  warehouseLogId: string;

  @Column({
    name: 'item_id',
    type: 'char',
    length: 36,
  })
  itemId: string;

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

  @ManyToOne(() => WarehouseLog, (wh) => wh.itemLogs)
  @JoinColumn({ name: 'warehouse_log_id' })
  warehouseLog: WarehouseLog;

  @OneToOne(() => Item)
  @JoinColumn({ name: 'item_id' })
  item: Item;
}
