import { WAREHOUSE_ORDER_BY } from './../../../../../shared/constants/common';
import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { NotFoundException } from '@nestjs/common';
import { BaseRepository } from '../../../../../shared/repositories/base.repository';
import { Brackets, EntityRepository, Like } from 'typeorm';
import { Warehouse } from '../entities/warehouse.entity';
import { WarehouseQuery } from '../dtos/warehouse-query.dto';
import { ORDER_TYPE } from 'shared/constants/common';

@EntityRepository(Warehouse)
export class WarehouseRepository extends BaseRepository<Warehouse> {
  constructor() {
    super(Warehouse);
  }

  async getDetail(id: string): Promise<Warehouse> {
    const qb = this.createQueryBuilder('warehouse')
      .leftJoinAndSelect('warehouse.items', 'items')
      .leftJoinAndSelect('items.properties', 'properties')
      .leftJoinAndSelect('warehouse.warehouseLogs', 'warehouseLogs')
      .leftJoinAndSelect('warehouseLogs.itemLogs', 'itemLogs')
      .leftJoinAndSelect('itemLogs.item', 'itemLogsItem');

    qb.where('warehouse.id = :id', { id });

    const warehouse = await qb.getOne();
    if (!warehouse) {
      throw new NotFoundException(
        new DetailErrorCode(
          ErrCategoryCode.ID_NOT_REGISTER,
          ErrMicroserviceCode.WAREHOUSE,
          ErrDetailCode.WAREHOUSE,
        ),
      );
    }

    return warehouse;
  }

  async getByConditions(query: WarehouseQuery): Promise<[Warehouse[], number]> {
    const { search, limit, offset, managerUserId, status } = query;

    let orderType = query.orderType ?? ORDER_TYPE.DESCENDING;
    let orderBy = query.orderBy ?? WAREHOUSE_ORDER_BY.CREATED_AT;

    const qb = this.createQueryBuilder('warehouses');

    //search
    if (search) {
      qb.andWhere(
        new Brackets((qb) => {
          const likeSearch = `%${search}%`;
          qb.orWhere('warehouses.name LIKE :likeSearch', {
            likeSearch,
          })
            .orWhere('warehouses.address LIKE :likeSearch', { likeSearch })
            .orWhere('warehouses.city LIKE :likeSearch', { likeSearch })
            .orWhere('warehouses.district LIKE :likeSearch', { likeSearch });
        }),
      );
    }

    //filter
    if (managerUserId) {
      qb.andWhere('warehouses.managerUserId = :managerUserId', {
        managerUserId,
      });
    }
    if (status) {
      qb.andWhere('warehouses.status = :status', { status });
    }

    //order
    qb.orderBy(`warehouses.${orderBy}`, orderType);

    return qb.take(limit).skip(offset).getManyAndCount();
  }
}
