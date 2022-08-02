import { BaseRepository } from '../../../../../shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { CustomProductTemplate } from '../entities/custom-product-template.entity';

@EntityRepository(CustomProductTemplate)
export class CustomProductTemplateRepository extends BaseRepository<CustomProductTemplate> {
  constructor() {
    super(CustomProductTemplate);
  }
}
