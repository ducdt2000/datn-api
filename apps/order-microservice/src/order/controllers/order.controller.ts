import { UpdateOrderStatus } from './../dtos/update-order-status.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReqContext } from 'shared/request-context/req-context.decorator';
import { AppLogger } from '../../../../../shared/logger/logger.service';
import { OrderQuery } from '../dtos/order-query.dto';
import { OrderService } from '../services/order.service';
import { BaseApiResponse } from 'shared/dtos/base-api-response.dto';
import { OrderOutput } from '../dtos/order-output.dto';
import { OrderInput } from '../dtos/order-input.dto';
import { OrderLogOutput } from '../dtos/order-log-output.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly logger: AppLogger,
    private readonly orderService: OrderService,
  ) {
    this.logger.setContext(OrderController.name);
  }

  @Get()
  async getOrders(
    @ReqContext() ctx: RequestContext,
    @Query() query: OrderQuery,
  ): Promise<BaseApiResponse<OrderOutput[]>> {
    this.logger.log(ctx, `${this.getOrders} was called`);

    const [data, count] = await this.orderService.getOrders(ctx, query);

    return { data, meta: { count } };
  }

  @Get(':orderId')
  async getOrder(
    @ReqContext() ctx: RequestContext,
    @Param('orderId') orderId: string,
  ): Promise<BaseApiResponse<OrderOutput>> {
    this.logger.log(ctx, `${this.getOrder} was called`);

    const data = await this.orderService.getOrder(ctx, orderId);

    return { data };
  }

  @Post()
  async createOrder(
    @ReqContext() ctx: RequestContext,
    @Body() input: OrderInput,
  ): Promise<BaseApiResponse<OrderOutput>> {
    this.logger.log(ctx, `${this.createOrder} was called`);

    const data = await this.orderService.createOrder(ctx, input);
    return { data };
  }

  @Put(':orderId')
  async updateOrder(
    @ReqContext() ctx: RequestContext,
    @Param('orderId') orderId: string,
    @Body() input: UpdateOrderStatus,
  ): Promise<BaseApiResponse<OrderOutput>> {
    this.logger.log(ctx, `${this.updateOrder} was called`);

    const data = await this.orderService.updateStatus(ctx, orderId, input);

    return { data };
  }

  @Get(':orderId/logs/:orderLogId')
  async getOrderLog(
    @ReqContext() ctx: RequestContext,
    @Param('orderId') orderId: string,
    @Param('orderLogId') orderLogId: string,
  ): Promise<BaseApiResponse<OrderLogOutput>> {
    this.logger.log(ctx, `${this.getOrderLog} was called`);

    const data = await this.orderService.getOrderLog(ctx, orderId, orderLogId);

    return { data };
  }
}
