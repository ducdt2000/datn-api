import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { HttpRequestService } from './../../../../../shared/http-request/http-request.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductTypeInput } from '../dtos/product-type-input.dto';
import { ProductTypeOutput } from '../dtos/product-type-output.dto';

const pathProductTypes = 'v1/api/product-types';

@Injectable()
export class ProductTypeService {
  constructor(
    private readonly logger: AppLogger,
    private httpService: HttpRequestService,
    private configService: ConfigService,
  ) {
    this.logger.setContext(ProductTypeService.name);
  }

  async createProductType(
    ctx: RequestContext,
    input: ProductTypeInput,
  ): Promise<ProductTypeOutput> {
    this.logger.log(ctx, `${this.createProductType.name} was called`);

    const productMicroserviceUrl = this.configService.get<string>(
      'microservice.product',
    );
    const apiUrl = `${productMicroserviceUrl}/${pathProductTypes}`;
    this.logger.log(ctx, 'calling product-microservice createProductType');

    const response = await this.httpService.post<ProductTypeOutput>(
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

  async getProductTypes(
    ctx: RequestContext,
  ): Promise<[ProductTypeOutput[], number]> {
    this.logger.log(ctx, `${this.getProductTypes.name} was called`);

    const productMicroserviceUrl = this.configService.get<string>(
      'microservice.product',
    );
    const apiUrl = `${productMicroserviceUrl}/${pathProductTypes}`;
    this.logger.log(ctx, 'calling product-microservice getProductTypes');

    const response = await this.httpService.get<ProductTypeOutput[]>(
      ctx,
      apiUrl,
    );

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return [response.data, response.meta.count];
  }

  async updateProductType(
    ctx: RequestContext,
    input: any,
    id: string,
  ): Promise<ProductTypeOutput> {
    this.logger.log(ctx, `${this.updateProductType.name} was called`);

    const productMicroserviceUrl = this.configService.get<string>(
      'microservice.product',
    );
    const apiUrl = `${productMicroserviceUrl}/${pathProductTypes}/${id}`;
    this.logger.log(ctx, 'calling product-microservice updateProductType');

    const response = await this.httpService.put<ProductTypeOutput>(
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

  async deleteProductType(
    ctx: RequestContext,
    id: string,
  ): Promise<ProductTypeOutput> {
    this.logger.log(ctx, `${this.deleteProductType.name} was called`);

    const productMicroserviceUrl = this.configService.get<string>(
      'microservice.product',
    );
    const apiUrl = `${productMicroserviceUrl}/${pathProductTypes}/${id}`;
    this.logger.log(ctx, 'calling product-microservice deleteProductType');

    const response = await this.httpService.delete<ProductTypeOutput>(
      ctx,
      apiUrl,
    );

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }
}
