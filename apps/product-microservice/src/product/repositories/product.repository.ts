import {
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { ErrCategoryCode } from '../../../../../shared/constants/errors';
import { DetailErrorCode } from '../../../../../shared/errors/detail-error-code';
import { NotFoundException } from '@nestjs/common';
import {
  PRODUCT_ORDER_BY,
  ORDER_TYPE,
} from './../../../../../shared/constants/common';
import { BaseRepository } from './../../../../../shared/repositories/base.repository';
import { Brackets, EntityRepository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductQuery } from '../dtos/product-query.dto';

@EntityRepository(Product)
export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(Product);
  }

  async getDetail(id: string): Promise<Product> {
    const qb = this.createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.productType', 'productType')
      .leftJoinAndSelect('product.properties', 'properties')
      .where('product.id = :id', { id });

    const product = await qb.getOne();
    if (!product) {
      throw new NotFoundException(
        new DetailErrorCode(
          ErrCategoryCode.INVALID_PARAM,
          ErrMicroserviceCode.PRODUCT,
          ErrDetailCode.PRODUCT,
          'Product not found',
        ),
      );
    }
    return product;
  }

  async getByConditions(query: ProductQuery): Promise<[Product[], number]> {
    const {
      search,
      brand,
      orderBy,
      type,
      dateFrom,
      dateTo,
      brandType,
      limit,
      offset,
    } = query;
    const orderType = query.orderType ?? ORDER_TYPE.DESCENDING;

    const qb = this.createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.productType', 'productType')
      .leftJoinAndSelect('product.properties', 'properties');

    //search
    if (search) {
      qb.andWhere(
        new Brackets((qb) => {
          const likeSearch = `%${search}%`;
          qb.orWhere('product.name LIKE :likeSearch', { likeSearch });
          qb.orWhere('product.description LIKE :likeSearch', { likeSearch });
        }),
      );
    }

    //filter
    if (brand) {
      qb.andWhere('brand.slug = :brand', { brand });
    }
    if (type) {
      qb.andWhere('productType.code = :type', { type });
    }
    if (brandType) {
      qb.andWhere('brand.type = :brandType', { brandType });
    }
    if (dateFrom) {
      qb.andWhere('product.createdAt > :dateFrom', { dateFrom });
    }
    if (dateTo) {
      qb.andWhere('product.createdAt < :dateTo', { dateTo });
    }

    //order
    switch (orderBy) {
      case PRODUCT_ORDER_BY.CREATED_AT: {
        qb.orderBy('product.createdAt', orderType);
        break;
      }
      case PRODUCT_ORDER_BY.PRICE: {
        qb.orderBy('product.price', orderType);
        break;
      }
      case PRODUCT_ORDER_BY.NAME: {
        qb.orderBy('product.name', orderType);
        break;
      }
      default: {
        qb.orderBy('product.starPoint', orderType);
      }
    }

    return qb.limit(limit).offset(offset).getManyAndCount();
  }
}
