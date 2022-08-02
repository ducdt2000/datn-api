import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { HttpRequestService } from 'shared/http-request/http-request.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomProductInput } from '../dtos/custom-product-input.dto';

const pathCustomProduct = 'v1/api/custom-products';

@Injectable()
export class CustomProductService {
  constructor(
    private readonly logger: AppLogger,
    private httpService: HttpRequestService,
    private configService: ConfigService,
  ) {
    this.logger.setContext(CustomProductService.name);
  }

  async getCustomTemplates(ctx: RequestContext) {
    const productMicroserviceUrl = this.configService.get<string>(
      'microservice.product',
    );
    const apiUrl = `${productMicroserviceUrl}/${pathCustomProduct}/templates`;

    const response = await this.httpService.get(ctx, apiUrl);

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response;
  }

  async getCustomTemplate(ctx: RequestContext, id: number) {
    const productMicroserviceUrl = this.configService.get<string>(
      'microservice.product',
    );
    const apiUrl = `${productMicroserviceUrl}/${pathCustomProduct}/templates/${id}`;

    const response = await this.httpService.get(ctx, apiUrl);

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response;
  }

  async createCustomProduct(ctx: RequestContext, input: CustomProductInput) {
    const productMicroserviceUrl = this.configService.get<string>(
      'microservice.product',
    );
    const apiUrl = `${productMicroserviceUrl}/${pathCustomProduct}`;

    const response = await this.httpService.post(ctx, apiUrl, {
      ...input,
      userId: ctx.user.id,
    });

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response;
  }
}
