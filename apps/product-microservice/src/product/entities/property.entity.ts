import { BaseEntity } from './../../../../../shared/entities/base.entity';
import { ProductVersion } from './product-version.entity';
import { PropertyValue } from './property-value.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('properties')
export class Property implements BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
  })
  name: string;

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

  @OneToMany(() => PropertyValue, (v) => v.property)
  values: PropertyValue[];

  @ManyToMany(() => ProductVersion, (pv) => pv.properties)
  productVersions: ProductVersion[];
}
