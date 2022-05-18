import { BaseRepository } from './../../../../../shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { Brand } from '../entities/brand.entity';

@EntityRepository(Brand)
export class BrandRepository extends BaseRepository<Brand> {}
