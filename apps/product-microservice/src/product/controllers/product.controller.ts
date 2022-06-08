import { ImagesInput } from './../dtos/images-input.dto';
import { ProductUpdateInput } from './../dtos/product-update-input.dto';
import { ProductQuery } from './../dtos/product-query.dto';
import { ProductOutput } from './../dtos/product-output.dto';
import { BaseApiResponse } from './../../../../../shared/dtos/base-api-response.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { ReqContext } from '../../../../../shared/request-context/req-context.decorator';
import { ProductInput } from '../dtos/product-input.dto';
import { ImageInput } from './../dtos/image-input.dto';

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

  @Get(':id')
  async getProduct(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<ProductOutput>> {
    this.logger.log(ctx, `${this.getProduct.name} was called`);

    const data = await this.productService.getProduct(ctx, id);
    return { data, meta: { count: 1 } };
  }

  @Get()
  async getProducts(
    @ReqContext() ctx: RequestContext,
    @Query() query: ProductQuery,
  ) {
    this.logger.log(ctx, `${this.getProducts.name} was called`);

    const [data, count] = await this.productService.getProducts(ctx, query);
    return { data, meta: { count } };
  }

  @Put(':id')
  async updateProduct(
    @ReqContext() ctx: RequestContext,
    @Body() input: ProductUpdateInput,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<ProductOutput>> {
    this.logger.log(ctx, `${this.updateProduct.name} was called`);

    const data = await this.productService.updateProduct(ctx, id, input);
    return { data, meta: {} };
  }

  @Delete(':id')
  async deleteProduct(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<ProductOutput>> {
    this.logger.log(ctx, `${this.deleteProduct.name} was called`);

    const data = await this.productService.deleteProduct(ctx, id);
    return { data };
  }

  @Post(':id/images')
  async addBulkImages(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
    @Body() input: ImagesInput,
  ) {
    this.logger.log(ctx, `${this.addBulkImages.name} was called`);

    const data = await this.productService.addImages(ctx, id, input);
    return { data };
  }

  @Post(':id/images/default')
  async updateDefaultImage(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
    @Body() input: ImageInput,
  ) {
    this.logger.log(ctx, `${this.updateDefaultImage.name} was called`);

    const data = await this.productService.updateDefaultImage(ctx, id, input);
    return { data };
  }
}
