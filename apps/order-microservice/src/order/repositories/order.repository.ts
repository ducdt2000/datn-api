import { ORDER_ORDER_BY } from './../../../../../shared/constants/common';
import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { NotFoundException } from '@nestjs/common';
import { BaseRepository } from '../../../../../shared/repositories/base.repository';
import { Brackets, EntityRepository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderQuery } from '../dtos/order-query.dto';
import { ORDER_TYPE } from 'shared/constants/common';

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
    const {
      limit,
      offset,
      search,
      status,
      userId: userId,
      warehouseId,
      paymentMethodId,
      deliveryMethodId,
      from,
      to,
    } = query;

    let orderType = query.orderType ?? ORDER_TYPE.DESCENDING;
    let orderBy = query.orderBy ?? ORDER_ORDER_BY.CREATED_AT;

    const qb = this.createQueryBuilder('order');
    qb.leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('order.orderLogs', 'orderLogs')
      .leftJoinAndSelect('items.properties', 'properties')
      .leftJoinAndSelect('order.paymentMethod', 'paymentMethod')
      .leftJoinAndSelect('order.deliveryMethod', 'deliveryMethod');

    //search
    if (search) {
      qb.andWhere(
        new Brackets((qb) => {
          const likeSearch = `%${search}%`;
          qb.orWhere(
            [
              'order.address LIKE :likeSearch',
              'order.city LIKE :likeSearch',
              'order.district LIKE :likeSearch',
              'order.message LIKE :likeSearch',
              'order.phone LIKE :likeSearch',
              'items.name LIKE :likeSearch',
              'items.code LIKE :likeSearch',
              'items.description LIKE :likeSearch',
            ],
            { likeSearch },
          );
        }),
      );
    }

    //filter
    if (status) {
      qb.andWhere('order.status = :status', { status });
    }
    if (userId) {
      qb.andWhere('order.userId = :userId', { userId });
    }
    if (warehouseId) {
      qb.andWhere('order.warehouseId = :warehouseId', { warehouseId });
    }
    if (deliveryMethodId) {
      qb.andWhere('order.deliveryMethodId = :deliveryMethodId', {
        deliveryMethodId,
      });
    }
    if (paymentMethodId) {
      qb.andWhere('order.paymentMethodId = :paymentMethodId', {
        paymentMethodId,
      });
    }
    if (from) {
      qb.andWhere('order.createdAt >= :from', { from });
    }
    if (to) {
      qb.andWhere('order.createdAt <= :to', { to });
    }

    //order
    qb.orderBy(`order.${orderBy}`, orderType);

    return qb.take(limit).skip(offset).getManyAndCount();
  }
}
