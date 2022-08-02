import { BaseRepository } from '../../../../../shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { CustomProduct } from '../entities/custom-product.entity';
import { CustomProperty } from '../entities/custom-property.entity';

@EntityRepository(CustomProperty)
export class CustomPropertyRepository extends BaseRepository<CustomProperty> {
  constructor() {
    super(CustomProperty);
  }
}
