import { BaseEntity } from './../../../../../shared/entities/base.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User implements BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'fullname',
    type: 'varchar',
    length: 50,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  fullname: string;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 20,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  username: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 50,
  })
  email: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 20,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  phone: string;

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
    name: 'gender',
    type: 'tinyint',
  })
  gender: number;

  @Column({
    name: 'avatar_link',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  avatarLink?: string;

  @Column({
    name: 'birthday',
    type: 'datetime',
  })
  birthday: Date;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 200,
  })
  password: string;

  @Column({
    name: 'invite_code',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  inviteCode?: string;

  @Column({
    name: 'role',
    type: 'varchar',
    length: 10,
  })
  role: string;

  @Column({
    name: 'is_active',
    type: 'tinyint',
  })
  isActive: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt?: Date;
}
