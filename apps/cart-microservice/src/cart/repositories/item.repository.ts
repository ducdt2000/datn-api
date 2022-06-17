import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'shared/repositories/base.repository';
import { Item } from '../entities/item.entity';

@EntityRepository(Item)
export class ItemRepository extends BaseRepository<Item> {
  constructor() {
    super(Item);
  }
}
