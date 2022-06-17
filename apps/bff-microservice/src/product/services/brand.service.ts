import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { HttpRequestService } from './../../../../../shared/http-request/http-request.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BrandOutput } from '../dtos/brand-output.dto';
import { BrandInput } from '../dtos/brand-input.dto';
import { BrandQuery } from '../dtos/brand-query.dto';

const pathBrands = 'v1/api/brands';

@Injectable()
export class BrandService {
  constructor(
    private readonly logger: AppLogger,
    private httpService: HttpRequestService,
    private configService: ConfigService,
  ) {
    this.logger.setContext(BrandService.name);
  }

  async createBrand(
    ctx: RequestContext,
    input: BrandInput,
  ): Promise<BrandOutput> {
    this.logger.log(ctx, `${this.createBrand.name} was called`);

    const productMicroserviceUrl = this.configService.get<string>(
      'microservice.product',
    );
    const apiUrl = `${productMicroserviceUrl}/${pathBrands}`;
    this.logger.log(ctx, 'calling product-microservice createBrand');

    const response = await this.httpService.post<BrandOutput>(
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

  async getBrands(
    ctx: RequestContext,
    query: BrandQuery,
  ): Promise<[BrandOutput[], number]> {
    this.logger.log(ctx, `${this.getBrands.name} was called`);

    const productMicroserviceUrl = this.configService.get<string>(
      'microservice.product',
    );
    const apiUrl = `${productMicroserviceUrl}/${pathBrands}`;
    this.logger.log(ctx, 'calling product-microservice getBrands');

    const response = await this.httpService.get<BrandOutput[]>(ctx, apiUrl, {
      params: query,
    });

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return [response.data, response.meta.count];
  }

  async updateBrand(
    ctx: RequestContext,
    input: any,
    id: string,
  ): Promise<BrandOutput> {
    this.logger.log(ctx, `${this.updateBrand.name} was called`);

    const productMicroserviceUrl = this.configService.get<string>(
      'microservice.product',
    );
    const apiUrl = `${productMicroserviceUrl}/${pathBrands}/${id}`;
    this.logger.log(ctx, 'calling product-microservice updateBrand');

    const response = await this.httpService.put<BrandOutput>(
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

  async deleteBrand(ctx: RequestContext, id: string): Promise<BrandOutput> {
    this.logger.log(ctx, `${this.deleteBrand.name} was called`);

    const productMicroserviceUrl = this.configService.get<string>(
      'microservice.product',
    );
    const apiUrl = `${productMicroserviceUrl}/${pathBrands}/${id}`;
    this.logger.log(ctx, 'calling product-microservice deleteBrand');

    const response = await this.httpService.delete<BrandOutput>(ctx, apiUrl);

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }
}
