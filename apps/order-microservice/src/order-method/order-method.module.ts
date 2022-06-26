import { PaymentMethodRepository } from './repositories/payment-method.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { DeliveryMethodRepository } from './repositories/delivery-method.repository';

@Module({
  imports: [
    SharedModule,
    ConfigModule,
    TypeOrmModule.forFeature([
      DeliveryMethodRepository,
      PaymentMethodRepository,
    ]),
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class OrderMethodModule {}
