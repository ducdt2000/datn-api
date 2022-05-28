import { BaseEntity } from './../entities/base.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

export class BaseRepository<T extends BaseEntity> extends Repository<T> {
  private entityName: string;
  private entityKeys: string[];

  constructor(private readonly entityClass: Function) {
    super();
    this.entityName = entityClass.name;
    this.entityKeys = Object.keys(entityClass);
  }

  async getById(id: string, withDeleted?: boolean): Promise<T> {
    const entity = await this.findOne(id, { withDeleted });
    if (!entity) {
      throw new NotFoundException(`${this.entityName} not found`);
    }
    return entity;
  }

  async getByIds(
    ids: string[],
    isCheckLoss: boolean = true,
    withDeleted?: boolean,
  ): Promise<T[]> {
    const entities = await this.findByIds(ids, { withDeleted });

    if (isCheckLoss) {
      const dbIds: string[] = entities.map((entity) => entity.id);

      const lossEntityIds = ids.filter((id: string) => !dbIds.includes(id));
      throw new NotFoundException(
        `${this.entityName} ${lossEntityIds.join(', ')} not found`,
      );
    }
    return entities;
  }

  // async getByConditions(
  //   query: any,
  //   withDeleted?: boolean,
  // ): Promise<[T[], number]> {
  //   const queryBuilder = this.createQueryBuilder('entity');
  //   const keys = Object.keys(query);

  //   if (query.search) {
  //   }

  //   //query
  //   const validKeys = keys.filter((key) => this.entityKeys.includes(key));
  //   for (const key of validKeys) {
  //     if (query[key] instanceof Array) {
  //       queryBuilder.andWhere(`entity.${key} IN (:...value)`, {
  //         value: query[key],
  //       });
  //     } else {
  //       queryBuilder.andWhere(`entity.${key} = :value`, {
  //         value: query[key],
  //       });
  //     }
  //   }

  //   if (withDeleted) {
  //     queryBuilder.withDeleted();
  //   }
  //   return await queryBuilder
  //     .offset(query.offset)
  //     .limit(query.limit)
  //     .getManyAndCount();
  // }
}
