import {
  ErrCategoryCode,
  ErrDetailCode,
  ErrMicroserviceCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { NotFoundException } from '@nestjs/common';
import { BaseRepository } from './../../../../../shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { Cart } from '../entities/cart.entity';

@EntityRepository(Cart)
export class CartRepository extends BaseRepository<Cart> {
  constructor() {
    super(Cart);
  }

  async getDetail(id: string): Promise<Cart> {
    const qb = this.createQueryBuilder('cart');
    qb.leftJoinAndSelect('cart.items', 'items').leftJoinAndSelect(
      'items.properties',
      'properties',
    );

    const cart = await qb.where('cart.id = :id', { id }).getOne();
    if (!cart) {
      throw new NotFoundException(
        new DetailErrorCode(
          ErrCategoryCode.ID_NOT_REGISTER,
          ErrMicroserviceCode.CART,
          ErrDetailCode.CART,
          'Cart not found',
        ),
      );
    }
    return cart;
  }
}
