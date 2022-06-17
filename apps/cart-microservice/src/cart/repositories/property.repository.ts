import { EntityRepository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { BaseRepository } from './../../../../../shared/repositories/base.repository';

@EntityRepository(Property)
export class PropertyRepository extends BaseRepository<Property> {
  constructor() {
    super(Property);
  }
}
