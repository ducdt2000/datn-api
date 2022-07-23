import {
  ORDER_TYPE,
  WAREHOUSE_LOG_ORDER_BY,
} from './../../../../../shared/constants/common';
import { WarehouseLogQuery } from './../dtos/warehouse-log-query.dto';
import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { NotFoundException } from '@nestjs/common';
import { BaseRepository } from 'shared/repositories/base.repository';
import { Brackets, EntityRepository } from 'typeorm';
import { WarehouseLog } from '../entities/warehouse-log.entity';

@EntityRepository(WarehouseLog)
export class WarehouseLogRepository extends BaseRepository<WarehouseLog> {
  constructor() {
    super(WarehouseLog);
  }

  async getDetail(id: string): Promise<WarehouseLog> {
    const qb = this.createQueryBuilder('warehouseLog').leftJoinAndSelect(
      'warehouseLog.itemLogs',
      'itemLogs',
    );

    qb.whereInIds([id]);

    const log = await qb.getOne();

    if (!log) {
      throw new NotFoundException(
        new DetailErrorCode(
          ErrCategoryCode.ID_NOT_REGISTER,
          ErrMicroserviceCode.WAREHOUSE,
          ErrDetailCode.LOG,
          'Warehouse log not found',
        ),
      );
    }

    return log;
  }

  async getByConditions(
    warehouseId: string,
    query: WarehouseLogQuery,
  ): Promise<[WarehouseLog[], number]> {
    const { userId, type, dateFrom, dateTo, limit, offset } = query;

    let orderType = query.orderType ?? ORDER_TYPE.DESCENDING;
    let orderBy = query.orderBy ?? WAREHOUSE_LOG_ORDER_BY.CREATED_AT;

    const qb = this.createQueryBuilder('warehouseLogs');

    //filter
    qb.andWhere('warehouseLogs.warehouseId = :warehouseId', { warehouseId });
    if (userId) {
      qb.andWhere('warehouseLogs.userId = :userId', { userId });
    }
    if (type) {
      qb.andWhere('warehouseLogs.type = :type', { type });
    }
    if (dateFrom) {
      qb.andWhere('warehouseLogs.createdAt > :dateFrom', { dateFrom });
    }
    if (dateTo) {
      qb.andWhere('warehouseLogs.createdAt < :dateTo', { dateTo });
    }

    //order
    qb.orderBy(`warehouseLogs.${orderBy}`, orderType);

    return qb.take(limit).skip(offset).getManyAndCount();
  }
}
