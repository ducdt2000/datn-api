import { BaseRepository } from '../../../../../shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { CustomProductValue } from '../entities/custom-product-value.entity';

@EntityRepository(CustomProductValue)
export class CustomProductValueRepository extends BaseRepository<CustomProductValue> {
  constructor() {
    super(CustomProductValue);
  }
}
