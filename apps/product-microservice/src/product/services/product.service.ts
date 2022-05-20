import { ProductInput } from './../dtos/product-input.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ProductRepository } from './../repositories/product.repository';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { ProductOutput } from '../dtos/product-output.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly logger: AppLogger,
    private readonly productRepository: ProductRepository,
  ) {
    this.logger.setContext(ProductService.name);
  }

  async createProduct(
    ctx: RequestContext,
    input: ProductInput,
  ): Promise<ProductOutput> {
    return null;
  }
}
