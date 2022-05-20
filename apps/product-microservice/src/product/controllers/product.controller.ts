import { ProductOutput } from './../dtos/product-output.dto';
import { BaseApiResponse } from './../../../../../shared/dtos/base-api-response.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { ReqContext } from 'shared/request-context/req-context.decorator';
import { ProductInput } from '../dtos/product-input.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly logger: AppLogger,
    private readonly productService: ProductService,
  ) {
    this.logger.setContext(ProductController.name);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @ReqContext() ctx: RequestContext,
    @Body() input: ProductInput,
  ): Promise<BaseApiResponse<ProductOutput>> {
    this.logger.log(ctx, `${this.createProduct.name} was called`);

    const data = await this.productService.createProduct(ctx, input);
    return { data, meta: { count: 1 } };
  }
}
