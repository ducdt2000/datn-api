import { BaseEntity } from './../../../../../shared/entities/base.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity('comments')
export class Comment implements BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'star',
    type: 'int',
    nullable: true,
  })
  star?: number;

  @Column({
    name: 'product_id',
    type: 'char',
    length: 36,
  })
  productId: string;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 30,
  })
  type: string;

  @Column({
    name: 'ref_user_ids',
    type: 'json',
  })
  refUserIds: string[];

  @Column({
    name: 'user_id',
    type: 'char',
    length: 36,
  })
  userId: string;

  @Column({
    name: 'content',
    type: 'text',
    nullable: true,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  content?: string;

  @Column({
    name: 'level',
    type: 'int',
  })
  level: number;

  @Column({
    name: 'comment_parent_id',
    type: 'char',
    length: 36,
    nullable: true,
  })
  commentParentId?: string;

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

  @ManyToOne(() => Comment, (p) => p.children)
  @JoinColumn({
    name: 'comment_parent_id',
    referencedColumnName: 'id',
  })
  parent?: Comment;

  @OneToMany(() => Comment, (c) => c.parent)
  children: Comment[];

  @ManyToOne(() => Product, (p) => p.comments)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;
}
