import { ORDER_TYPE } from './../../../../../shared/constants/common';
import { BaseRepository } from './../../../../../shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { Brand } from '../entities/brand.entity';
import { BrandQuery } from '../dtos/brand-query.dto';

@EntityRepository(Brand)
export class BrandRepository extends BaseRepository<Brand> {
  constructor() {
    super(Brand);
  }

  async getByConditions(query: BrandQuery): Promise<[Brand[], number]> {
    const {
      search,
      type,
      orderBy,
      orderType,
      createdFrom,
      createdTo,
      updatedFrom,
      updatedTo,
    } = query;
    const qb = this.createQueryBuilder('brand');

    if (search) {
      qb.where(`brand.name LIKE :'${search}'`);
    }

    if (type) {
      qb.andWhere('brand.type = :type', { type });
    }

    if (createdFrom) {
      qb.andWhere('brand.createdAt >= :createdFrom', {
        createdFrom,
      });
    }

    if (createdTo) {
      qb.andWhere('brand.createdAt <= :createdTo', {
        createdTo,
      });
    }

    if (updatedFrom) {
      qb.andWhere('brand.createdAt >= :updatedFrom', {
        updatedFrom,
      });
    }
    if (updatedTo) {
      qb.andWhere('brand.createdAt <= :updatedTo', {
        updatedTo,
      });
    }

    qb.orderBy(`brand.${orderBy ?? 'name'}`, orderType ?? ORDER_TYPE.ASCENDING);

    return qb.getManyAndCount();
  }
}
