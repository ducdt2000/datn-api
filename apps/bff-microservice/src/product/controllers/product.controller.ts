import { Roles } from './../../../../../shared/decorators/role.decorator';
import { RoleGuard } from './../../../../../shared/guards/role.guard';
import { JwtAuthGuard } from './../../../../../shared/guards/jwt-auth.guard';
import { BaseApiResponse } from './../../../../../shared/dtos/base-api-response.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ReqContext } from './../../../../../shared/request-context/req-context.decorator';
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
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { ProductInput } from '../dtos/product-input.dto';
import { ProductOutput } from '../dtos/product-output.dto';
import { ProductQuery } from '../dtos/product-query.dto';
import { ProductUpdateInput } from '../dtos/product-update-input.dto';
import { ROLE } from './../../../../../shared/constants/common';
import { CartItemOutput } from '../../cart/dtos/item-output.dto';

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
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN, ROLE.STAFF)
  async createProduct(
    @ReqContext() ctx: RequestContext,
    @Body() input: ProductInput,
  ): Promise<BaseApiResponse<ProductOutput>> {
    this.logger.log(ctx, `${this.createProduct.name} was called`);

    const data = await this.productService.createProduct(ctx, input);
    return { data };
  }

  @Get(':id')
  async getProduct(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<ProductOutput>> {
    this.logger.log(ctx, `${this.getProduct.name} was called`);

    const data = await this.productService.getProduct(ctx, id);
    return { data };
  }

  @Get()
  async getProducts(
    @ReqContext() ctx: RequestContext,
    @Query() query: ProductQuery,
  ) {
    console.log('thisisctx', ctx);

    this.logger.log(ctx, `${this.getProducts.name} was called`);

    const [data, count] = await this.productService.getProducts(ctx, query);
    return { data, meta: { count } };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN, ROLE.STAFF)
  async updateProduct(
    @ReqContext() ctx: RequestContext,
    @Body() input: ProductUpdateInput,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<ProductOutput>> {
    this.logger.log(ctx, `${this.updateProduct.name} was called`);

    const data = await this.productService.updateProduct(ctx, id, input);
    return { data };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN)
  async deleteProduct(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<ProductOutput>> {
    this.logger.log(ctx, `${this.deleteProduct.name} was called`);

    const data = await this.productService.deleteProduct(ctx, id);
    return { data };
  }

  @Post(':productId/add-to-cart')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.USER)
  async addToCart(
    @ReqContext() ctx: RequestContext,
    @Param('productId') productId: string,
  ): Promise<BaseApiResponse<CartItemOutput>> {
    this.logger.log(ctx, `${this.addToCart.name} was called`);

    const data = await this.productService.addToCart(ctx, productId);

    return { data };
  }
}
