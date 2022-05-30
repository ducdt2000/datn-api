import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './../../../../../shared/entities/base.entity';

@Entity('public_files')
export class PublicFile implements BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'url',
    type: 'varchar',
    length: 200,
  })
  url: string;

  @Column({
    name: 'key',
    type: 'varchar',
    length: '50',
  })
  key: string;

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
}
