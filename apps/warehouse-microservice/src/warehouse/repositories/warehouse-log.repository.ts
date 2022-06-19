import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { NotFoundException } from '@nestjs/common';
import { BaseRepository } from 'shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';
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
}
