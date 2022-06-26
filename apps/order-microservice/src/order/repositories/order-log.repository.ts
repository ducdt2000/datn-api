import { BaseRepository } from 'shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { OrderLog } from '../entities/order-log.entity';

@EntityRepository(OrderLog)
export class OrderLogRepository extends BaseRepository<OrderLog> {
  constructor() {
    super(OrderLog);
  }
}
