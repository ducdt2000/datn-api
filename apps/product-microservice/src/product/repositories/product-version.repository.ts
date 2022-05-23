import { ProductVersion } from './../entities/product-version.entity';
import { BaseRepository } from './../../../../../shared/repositories/base.repository';
import { EntityRepository } from 'typeorm';

@EntityRepository(ProductVersion)
export class ProductVersionRepository extends BaseRepository<ProductVersion> {
  async getVersionsByProductId(productId: string): Promise<ProductVersion[]> {
    return this.find({ where: { productId } });
  }
}
