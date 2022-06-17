import {
  ORDER_TYPE,
  USER_ORDER_BY,
} from './../../../../../shared/constants/common';
import { Brackets, EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../../../shared/repositories/base.repository';
import { UserQuery } from '../dtos/user-query.dto';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  async getByConditions(query: UserQuery): Promise<[User[], number]> {
    const {
      search,
      city,
      district,
      gender,
      status,
      role,
      dateFrom,
      dateTo,
      withDelete,
      limit,
      offset,
    } = query;
    const qb = this.createQueryBuilder('user');

    let orderType = query.orderType ?? ORDER_TYPE.DESCENDING;
    let orderBy = query.orderBy ?? USER_ORDER_BY.FULLNAME;

    //search
    if (search) {
      qb.andWhere(
        new Brackets((qb) => {
          const likeSearch = `%${search}%`;
          qb.orWhere('user.fullname LIKE :likeSearch', { likeSearch });
          qb.orWhere('user.username LIKE :likeSearch', { likeSearch });
          qb.orWhere('user.email LIKE :likeSearch', { likeSearch });
          qb.orWhere('user.phone LIKE :likeSearch', { likeSearch });
          qb.orWhere('user.address LIKE :likeSearch', { likeSearch });
        }),
      );
    }

    //filter
    if (city) {
      qb.andWhere('user.city = :city', { city });
    }
    if (district) {
      qb.andWhere('user.district = :district', { district });
    }
    if (gender) {
      qb.andWhere('user.gender = :gender', { gender });
    }
    if (status) {
      qb.andWhere('user.isActive = :status', { status });
    }
    if (role) {
      qb.andWhere('user.role = :role', { role });
    }
    if (dateFrom) {
      qb.andWhere('user.createdAt > :dateFrom', { dateFrom });
    }
    if (dateTo) {
      qb.andWhere('user.createdAt < :dateTo', { dateTo });
    }

    //order
    switch (orderBy) {
      case USER_ORDER_BY.AGE: {
        if (orderType === ORDER_TYPE.ASCENDING) {
          orderType = ORDER_TYPE.DESCENDING;
        } else {
          orderType = ORDER_TYPE.ASCENDING;
        }
        qb.orderBy('user.birthday', orderType);
        break;
      }
      default: {
        qb.orderBy(`user.${orderBy}`, orderType);
        break;
      }
    }

    if (withDelete) {
      qb.withDeleted();
    }

    return qb.limit(limit).offset(offset).getManyAndCount();
  }
}
