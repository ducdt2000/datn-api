import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { plainToInstance } from 'class-transformer';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { OrderQuery } from '../dtos/order-query.dto';
import { OrderOutput } from '../dtos/order-output.dto';
import { OrderInput } from '../dtos/order-input.dto';
import { PaymentMethodRepository } from '../../order-method/repositories/payment-method.repository';
import { DeliveryMethodRepository } from '../../order-method/repositories/delivery-method.repository';
import { UpdateOrderStatus } from '../dtos/update-order-status.dto';
import { OrderLogRepository } from '../repositories/order-log.repository';
import { OrderLogOutput } from '../dtos/order-log-output.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly logger: AppLogger,
    private readonly orderRepository: OrderRepository,
    private readonly paymentMethodRepository: PaymentMethodRepository,
    private readonly deliveryMethodRepository: DeliveryMethodRepository,
    private readonly orderLogRepository: OrderLogRepository,
  ) {
    this.logger.setContext(OrderService.name);
  }

  async getOrders(
    ctx: RequestContext,
    query: OrderQuery,
  ): Promise<[OrderOutput[], number]> {
    this.logger.log(ctx, `${this.getOrders.name} was called`);

    const [data, count] = await this.orderRepository.getByConditions(query);

    return [
      plainToInstance(OrderOutput, data, { excludeExtraneousValues: true }),
      count,
    ];
  }

  async getOrder(ctx: RequestContext, orderId: string): Promise<OrderOutput> {
    this.logger.log(ctx, `${this.getOrder.name} was called`);

    const order = await this.orderRepository.getDetail(orderId);

    return plainToInstance(OrderOutput, order, {
      excludeExtraneousValues: true,
    });
  }

  async createOrder(
    ctx: RequestContext,
    input: OrderInput,
  ): Promise<OrderOutput> {
    this.logger.log(ctx, `${this.createOrder.name} was called`);

    await Promise.all([
      this.deliveryMethodRepository.getById(input.deliveryMethodId),
      this.paymentMethodRepository.getById(input.paymentMethodId),
    ]);

    const order = this.orderRepository.create(input);

    const savedOrder = await this.orderRepository.save(order);

    return plainToInstance(OrderOutput, savedOrder, {
      excludeExtraneousValues: true,
    });
  }

  async updateStatus(
    ctx: RequestContext,
    orderId: string,
    input: UpdateOrderStatus,
  ): Promise<OrderOutput> {
    this.logger.log(ctx, `${this.updateStatus.name} was called`);

    const orderLog = this.orderLogRepository.create(input);
    orderLog.orderId = orderId;

    await this.orderLogRepository.save(orderLog);

    const savedOrder = await this.orderRepository.getDetail(orderId);
    return plainToInstance(OrderOutput, savedOrder, {
      excludeExtraneousValues: true,
    });
  }

  async getOrderLog(
    ctx: RequestContext,
    orderId: string,
    orderLogId: string,
  ): Promise<OrderLogOutput> {
    this.logger.log(ctx, `${this.getOrderLog.name} was called`);

    const orderLog = await this.orderLogRepository.findOne({
      orderId,
      id: orderLogId,
    });

    if (!orderLog) {
      throw new NotFoundException(
        new DetailErrorCode(
          ErrCategoryCode.ID_NOT_REGISTER,
          ErrMicroserviceCode.ORDER,
          ErrDetailCode.ORDER,
          'Order log not found',
        ),
      );
    }

    return plainToInstance(OrderLogOutput, orderLog, {
      excludeExtraneousValues: true,
    });
  }
}
