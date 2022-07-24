import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { RoleGuard } from './../../../../../shared/guards/role.guard';
import { JwtAuthGuard } from './../../../../../shared/guards/jwt-auth.guard';
import { UpdateOrderStatus } from './../dtos/update-order-status.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReqContext } from '../../../../../shared/request-context/req-context.decorator';
import { AppLogger } from '../../../../../shared/logger/logger.service';
import { OrderQuery } from '../dtos/order-query.dto';
import { OrderService } from '../services/order.service';
import { BaseApiResponse } from '../../../../../shared/dtos/base-api-response.dto';
import { OrderOutput } from '../dtos/order-output.dto';
import { OrderInput } from '../dtos/order-input.dto';
import { OrderLogOutput } from '../dtos/order-log-output.dto';
import { Roles } from '../../../../../shared/decorators/role.decorator';
import { ROLE } from '../../../../../shared/constants/common';

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
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN, ROLE.STAFF, ROLE.USER)
  async getOrders(
    @ReqContext() ctx: RequestContext,
    @Query() query: OrderQuery,
  ): Promise<BaseApiResponse<OrderOutput[]>> {
    this.logger.log(ctx, `${this.getOrders} was called`);

    const [data, count] = await this.orderService.getOrders(ctx, query);

    return { data, meta: { count } };
  }

  @Get(':orderId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN, ROLE.STAFF, ROLE.USER)
  async getOrder(
    @ReqContext() ctx: RequestContext,
    @Param('orderId') orderId: string,
  ): Promise<BaseApiResponse<OrderOutput>> {
    this.logger.log(ctx, `${this.getOrder} was called`);

    const data = await this.orderService.getOrder(ctx, orderId);

    if (ctx.user.role === ROLE.USER && ctx.user.id !== data.userId) {
      throw new ForbiddenException(
        new DetailErrorCode(
          ErrCategoryCode.FORBIDDEN,
          ErrMicroserviceCode.BFF,
          ErrDetailCode.ORDER,
        ),
      );
    }

    return { data };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.USER)
  async createOrder(
    @ReqContext() ctx: RequestContext,
    @Body() input: OrderInput,
  ): Promise<BaseApiResponse<OrderOutput>> {
    this.logger.log(ctx, `${this.createOrder.name} was called`);

    const data = await this.orderService.createOrder(ctx, input);
    return { data };
  }

  @Put(':orderId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN, ROLE.STAFF, ROLE.USER)
  async updateOrder(
    @ReqContext() ctx: RequestContext,
    @Param('orderId') orderId: string,
    @Body() input: UpdateOrderStatus,
  ): Promise<BaseApiResponse<OrderOutput>> {
    this.logger.log(ctx, `${this.updateOrder} was called`);

    const dataOrder = await this.orderService.getOrder(ctx, orderId);

    if (ctx.user.role === ROLE.USER && ctx.user.id !== dataOrder.userId) {
      throw new ForbiddenException(
        new DetailErrorCode(
          ErrCategoryCode.FORBIDDEN,
          ErrMicroserviceCode.BFF,
          ErrDetailCode.ORDER,
        ),
      );
    }

    const data = await this.orderService.updateStatus(ctx, orderId, input);

    return { data };
  }

  @Get(':orderId/logs/:orderLogId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN, ROLE.STAFF, ROLE.USER)
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
