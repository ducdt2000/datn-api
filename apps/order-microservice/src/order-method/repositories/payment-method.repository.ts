import { BaseRepository } from '../../../../../shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { PaymentMethod } from '../entities/payment-method.entity';

@EntityRepository(PaymentMethod)
export class PaymentMethodRepository extends BaseRepository<PaymentMethod> {
  constructor() {
    super(PaymentMethod);
  }
}
