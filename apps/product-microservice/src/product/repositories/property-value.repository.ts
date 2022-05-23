import { BaseRepository } from './../../../../../shared/repositories/base.repository';
import { PropertyValue } from '../entities/property-value.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(PropertyValue)
export class PropertyValueRepository extends BaseRepository<PropertyValue> {}
