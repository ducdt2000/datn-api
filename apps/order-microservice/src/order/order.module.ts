import { DeliveryMethodRepository } from './../order-method/repositories/delivery-method.repository';
import { OrderController } from './controllers/order.controller';
import { OrderLogRepository } from './repositories/order-log.repository';
import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from './repositories/item.repository';
import { OrderRepository } from './repositories/order.repository';
import { PropertyRepository } from './repositories/property.repository';
import { OrderService } from './services/order.service';
import { PaymentMethodRepository } from '../order-method/repositories/payment-method.repository';

@Module({
  imports: [
    SharedModule,
    ConfigModule,
    TypeOrmModule.forFeature([
      ItemRepository,
      OrderLogRepository,
      OrderRepository,
      PropertyRepository,
      PaymentMethodRepository,
      DeliveryMethodRepository,
    ]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
