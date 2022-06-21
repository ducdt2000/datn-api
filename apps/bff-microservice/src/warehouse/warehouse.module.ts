import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../config/configuration.module';
import { WarehouseService } from './services/warehouse.service';
import { WarehouseController } from './controllers/warehouse.controller';

@Module({
  imports: [SharedModule, ConfigurationModule],
  providers: [WarehouseService],
  exports: [WarehouseService],
  controllers: [WarehouseController],
})
export class WarehouseModule {}
