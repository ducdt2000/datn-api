import { plainToInstance } from 'class-transformer';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ConfigService } from '@nestjs/config';
import { HttpRequestService } from './../../../../../shared/http-request/http-request.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { ProductInput } from '../dtos/product-input.dto';
import { ProductOutput } from '../dtos/product-output.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { ProductQuery } from '../dtos/product-query.dto';
import { ProductUpdateInput } from '../dtos/product-update-input.dto';
import { ItemOutput } from '../../cart/dtos/item-output.dto';
import { CartService } from '../../cart/services/cart.service';
import { ItemInput } from '../../cart/dtos/item-input.dto';

const pathProducts = 'v1/api/products';

@Injectable()
export class ProductService {
  constructor(
    private readonly logger: AppLogger,
    private readonly httpService: HttpRequestService,
    private readonly configService: ConfigService,
    private readonly cartService: CartService,
  ) {
    this.logger.setContext(ProductService.name);
  }

  async createProduct(
    ctx: RequestContext,
    input: ProductInput,
  ): Promise<ProductOutput> {
    this.logger.log(ctx, `${this.createProduct.name} was called`);

    const productMicroserviceUrl = this.configService.get<string>(
      'microservice.product',
    );
    const apiUrl = `${productMicroserviceUrl}/${pathProducts}`;
    this.logger.log(ctx, 'calling product-microservice createProduct');

    const response = await this.httpService.post<ProductOutput>(
      ctx,
      apiUrl,
      input,
    );

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }

  async getProduct(ctx: RequestContext, id: string): Promise<ProductOutput> {
    this.logger.log(ctx, `${this.getProduct.name} was called`);

    const productMicroserviceUrl = this.configService.get<string>(
      'microservice.product',
    );
    const apiUrl = `${productMicroserviceUrl}/${pathProducts}/${id}`;
    this.logger.log(ctx, 'calling product-microservice getProduct');

    const response = await this.httpService.get<ProductOutput>(ctx, apiUrl);

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }

  async getProducts(
    ctx: RequestContext,
    query: ProductQuery,
  ): Promise<[ProductOutput[], number]> {
    this.logger.log(ctx, `${this.getProducts.name} was called`);

    const productMicroserviceUrl = this.configService.get<string>(
      'microservice.product',
    );
    const apiUrl = `${productMicroserviceUrl}/${pathProducts}`;
    this.logger.log(ctx, 'calling product-microservice getProduct');

    const response = await this.httpService.get<ProductOutput[]>(ctx, apiUrl, {
      params: { query },
    });

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return [response.data, response.meta.count];
  }

  async updateProduct(
    ctx: RequestContext,
    id: string,
    input: ProductUpdateInput,
  ): Promise<ProductOutput> {
    this.logger.log(ctx, `${this.updateProduct.name} was called`);

    const productMicroserviceUrl = this.configService.get<string>(
      'microservice.product',
    );
    const apiUrl = `${productMicroserviceUrl}/${pathProducts}/${id}`;
    this.logger.log(ctx, 'calling product-microservice updateProduct');

    const response = await this.httpService.put<ProductOutput>(
      ctx,
      apiUrl,
      input,
    );

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }

  async deleteProduct(ctx: RequestContext, id: string): Promise<ProductOutput> {
    this.logger.log(ctx, `${this.deleteProduct.name} was called`);

    const productMicroserviceUrl = this.configService.get<string>(
      'microservice.product',
    );
    const apiUrl = `${productMicroserviceUrl}/${pathProducts}/${id}`;
    this.logger.log(ctx, 'calling product-microservice deleteProduct');

    const response = await this.httpService.delete<ProductOutput>(ctx, apiUrl);

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }

  async addToCart(ctx: RequestContext, productId: string): Promise<ItemOutput> {
    this.logger.log(ctx, `${this.deleteProduct.name} was called`);

    const product = await this.getProduct(ctx, productId);

    const cartItem = plainToInstance(
      ItemInput,
      { ...product, productId: product.id, amount: 1 },
      { excludeExtraneousValues: true },
    );

    product.properties.forEach((property, index) => {
      cartItem.properties[index].value = property.values[0];
    });

    return this.cartService.createCartItem(ctx, ctx.user.id, cartItem);
  }
}
