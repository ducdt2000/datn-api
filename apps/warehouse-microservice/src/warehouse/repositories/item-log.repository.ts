import { BaseRepository } from 'shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { ItemLog } from '../entities/item-log.entity';

@EntityRepository(ItemLog)
export class ItemLogRepository extends BaseRepository<ItemLog> {
  constructor() {
    super(ItemLog);
  }
}
