import { BaseRepository } from './../../../../../shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { Cart } from '../entities/cart.entity';

@EntityRepository(Cart)
export class CartRepository extends BaseRepository<Cart> {
  constructor() {
    super(Cart);
  }
}
