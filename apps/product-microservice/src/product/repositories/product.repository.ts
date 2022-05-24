import { BaseRepository } from './../../../../../shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductQuery } from '../dtos/product-query.dto';

@EntityRepository(Product)
export class ProductRepository extends BaseRepository<Product> {
  async getDetail(id: string): Promise<Product> {
    const qb = this.createQueryBuilder('product')
      .leftJoinAndSelect(
        'product.defaultProductVersion',
        'defaultProductVersion',
      )
      .leftJoinAndSelect('product.productVersions', 'productVersions')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.productType', 'productType')
      .leftJoinAndSelect('productVersions.properties', 'properties')
      .leftJoinAndSelect('properties.values', 'propertyValues')
      .where('product.id = :id', { id });

    return qb.getOne();
  }

  async getByConditions(query: ProductQuery): Promise<[Product[], number]> {
    const qb = this.createQueryBuilder('product')
      .leftJoinAndSelect(
        'product.defaultProductVersion',
        'defaultProductVersion',
      )
      .leftJoinAndSelect('product.productVersions', 'productVersions')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.productType', 'productType')
      .leftJoinAndSelect('productVersions.properties', 'properties')
      .leftJoinAndSelect('properties.values', 'propertyValues');

    return await qb.getManyAndCount();
  }
}
