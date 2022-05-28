import { BaseRepository } from './../../../../../shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { ProductType } from '../entities/product-type.entity';

@EntityRepository(ProductType)
export class ProductTypeRepository extends BaseRepository<ProductType> {
  constructor() {
    super(ProductType);
  }
}
