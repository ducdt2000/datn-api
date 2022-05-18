import { BaseRepository } from './../../../../../shared/repositories/base.repository';
import { Property } from '../entities/property.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(Property)
export class PropertyRepository extends BaseRepository<Property> {}
