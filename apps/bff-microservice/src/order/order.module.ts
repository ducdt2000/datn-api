import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../config/configuration.module';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { UserModule } from '../user/user.module';
import { WarehouseModule } from '../warehouse/warehouse.module';

@Module({
  imports: [SharedModule, ConfigurationModule, UserModule, WarehouseModule],
  providers: [OrderService],
  exports: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
