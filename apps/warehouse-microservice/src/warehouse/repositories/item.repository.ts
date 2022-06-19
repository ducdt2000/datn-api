import { EntityRepository } from 'typeorm';
import { BaseRepository } from './../../../../../shared/repositories/base.repository';
import { Item } from '../entities/item.entity';

@EntityRepository(Item)
export class ItemRepository extends BaseRepository<Item> {
  constructor() {
    super(Item);
  }

  // async getDetail(cartId: string, id: string): Promise<Item> {
  //   const qb = this.createQueryBuilder('item')
  //     .leftJoinAndSelect('item.properties', 'properties')
  //     .where('item.id = :id AND item.cartId = :cartId', { id, cartId });

  //   const item = await qb.getOne();
  //   if (!item) {
  //     throw new NotFoundException(
  //       new DetailErrorCode(
  //         ErrCategoryCode.ID_NOT_REGISTER,
  //         ErrMicroserviceCode.CART,
  //         ErrDetailCode.ITEM,
  //         'Item not found',
  //       ),
  //     );
  //   }

  //   return item;
  // }
}
