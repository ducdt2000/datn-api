import { BaseRepository } from '../../../../../shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { CustomProduct } from '../entities/custom-product.entity';

@EntityRepository(CustomProduct)
export class CustomProductRepository extends BaseRepository<CustomProduct> {
  constructor() {
    super(CustomProduct);
  }
}
