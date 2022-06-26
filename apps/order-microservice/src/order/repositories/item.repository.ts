import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import {
  ErrCategoryCode,
  ErrDetailCode,
  ErrMicroserviceCode,
} from './../../../../../shared/constants/errors';
import { NotFoundException } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from './../../../../../shared/repositories/base.repository';
import { Item } from '../entities/item.entity';

@EntityRepository(Item)
export class ItemRepository extends BaseRepository<Item> {
  constructor() {
    super(Item);
  }

  async getDetail(orderId: string, id: string): Promise<Item> {
    const qb = this.createQueryBuilder('item')
      .leftJoinAndSelect('item.properties', 'properties')
      .where('item.id = :id AND item.cartId = :orderId', { id, orderId });

    const item = await qb.getOne();
    if (!item) {
      throw new NotFoundException(
        new DetailErrorCode(
          ErrCategoryCode.ID_NOT_REGISTER,
          ErrMicroserviceCode.ORDER,
          ErrDetailCode.ITEM,
          'Item not found',
        ),
      );
    }

    return item;
  }
}
