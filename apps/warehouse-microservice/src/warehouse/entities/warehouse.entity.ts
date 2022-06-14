import { WarehouseLog } from './warehouse-log.entity';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Item } from './item.entity';

@Entity('warehouses')
export class Warehouse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'manager_user_id',
    type: 'char',
    length: 36,
  })
  managerUserId: string;

  @Column({
    name: 'address',
    type: 'varchar',
    length: 100,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  address: string;

  @Column({
    name: 'city',
    type: 'varchar',
    length: 20,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  city: string;

  @Column({
    name: 'district',
    type: 'varchar',
    length: 20,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  district: string;

  @Column({
    name: 'status',
    type: 'tinyint',
  })
  status: number;

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

  @OneToMany(() => Item, (item) => item.warehouse)
  items: Item[];

  @OneToMany(() => WarehouseLog, (whl) => whl.warehouse)
  warehouseLogs: WarehouseLog[];
}
