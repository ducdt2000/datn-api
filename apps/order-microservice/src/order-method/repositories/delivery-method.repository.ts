import { BaseRepository } from '../../../../../shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { DeliveryMethod } from '../entities/delivery-method.entity';

@EntityRepository(DeliveryMethod)
export class DeliveryMethodRepository extends BaseRepository<DeliveryMethod> {
  constructor() {
    super(DeliveryMethod);
  }
}
