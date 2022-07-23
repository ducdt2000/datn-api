import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ConfigService } from '@nestjs/config';
import { HttpRequestService } from 'shared/http-request/http-request.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { HttpException, Injectable } from '@nestjs/common';
import { OrderQuery } from '../dtos/order-query.dto';
import { OrderOutput } from '../dtos/order-output.dto';
import { OrderInput } from '../dtos/order-input.dto';
import { UpdateOrderStatus } from '../dtos/update-order-status.dto';
import { OrderLogOutput } from '../dtos/order-log-output.dto';

const pathOrders = 'v1/api/orders';

@Injectable()
export class OrderService {
  private orderMicroserviceUrl: string;

  constructor(
    private readonly logger: AppLogger,
    private readonly httpService: HttpRequestService,
    private readonly configService: ConfigService,
  ) {
    this.logger.setContext(OrderService.name);

    this.orderMicroserviceUrl =
      this.configService.get<string>('microservice.order');
  }

  async getOrders(
    ctx: RequestContext,
    query: OrderQuery,
  ): Promise<[OrderOutput[], number]> {
    this.logger.log(ctx, `${this.getOrders.name} was called`);

    const apiUrl = `${this.orderMicroserviceUrl}/${pathOrders}`;

    const response = await this.httpService.get<OrderOutput[]>(ctx, apiUrl, {
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

  async getOrder(ctx: RequestContext, orderId: string): Promise<OrderOutput> {
    this.logger.log(ctx, `${this.getOrder.name} was called`);

    const apiUrl = `${this.orderMicroserviceUrl}/${pathOrders}/${orderId}`;

    const response = await this.httpService.get<OrderOutput>(ctx, apiUrl);

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }

  async createOrder(
    ctx: RequestContext,
    input: OrderInput,
  ): Promise<OrderOutput> {
    this.logger.log(ctx, `${this.createOrder.name} was called`);

    const apiUrl = `${this.orderMicroserviceUrl}/${pathOrders}`;

    const postInput = { ...input, userId: ctx.user.id };

    const response = await this.httpService.post<OrderOutput>(
      ctx,
      apiUrl,
      postInput,
    );

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }

  async updateStatus(
    ctx: RequestContext,
    orderId: string,
    input: UpdateOrderStatus,
  ): Promise<OrderOutput> {
    this.logger.log(ctx, `${this.updateStatus.name} was called`);

    const apiUrl = `${this.orderMicroserviceUrl}/${pathOrders}/${orderId}`;

    const response = await this.httpService.put<OrderOutput>(ctx, apiUrl, {
      ...input,
      userId: ctx.user.id,
    });

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }

  async getOrderLog(
    ctx: RequestContext,
    orderId: string,
    orderLogId: string,
  ): Promise<OrderLogOutput> {
    this.logger.log(ctx, `${this.getOrderLog.name} was called`);

    const apiUrl = `${this.orderMicroserviceUrl}/${pathOrders}/${orderId}/logs/${orderLogId}`;

    const response = await this.httpService.get<OrderLogOutput>(ctx, apiUrl);

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }
}
