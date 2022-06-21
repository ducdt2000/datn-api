import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { NotFoundException } from '@nestjs/common';
import { BaseRepository } from '../../../../../shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderQuery } from '../dtos/order-query.dto';

@EntityRepository(Order)
export class OrderRepository extends BaseRepository<Order> {
  constructor() {
    super(Order);
  }

  async getDetail(id: string): Promise<Order> {
    const qb = this.createQueryBuilder('order');

    qb.leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.properties', 'properties')
      .leftJoinAndSelect('order.orderLogs', 'orderLogs')
      .leftJoinAndSelect('order.paymentMethod', 'paymentMethod')
      .leftJoinAndSelect('order.deliveryMethod', 'deliveryMethod');

    qb.where('order.id = :id', { id });
    const order = qb.getOne();

    if (!order) {
      throw new NotFoundException(
        new DetailErrorCode(
          ErrCategoryCode.ID_NOT_REGISTER,
          ErrMicroserviceCode.ORDER,
          ErrDetailCode.ORDER,
        ),
      );
    }
    return order;
  }

  async getByConditions(query: OrderQuery): Promise<[Order[], number]> {
    const { limit, offset } = query;

    const qb = this.createQueryBuilder('orders');

    return qb.limit(limit).offset(offset).getManyAndCount();
  }
}
