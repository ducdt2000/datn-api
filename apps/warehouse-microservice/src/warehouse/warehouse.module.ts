import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemLogRepository } from './repositories/item-log.repository';
import { ItemRepository } from './repositories/item.repository';
import { PropertyRepository } from './repositories/property.repository';
import { WarehouseLogRepository } from './repositories/warehouse-log.repository';
import { WarehouseRepository } from './repositories/warehouse.repository';
import { WarehouseService } from './services/warehouse.service';
import { WarehouseLogService } from './services/warehouse-log.service';
import { WarehouseController } from './controllers/warehouse.controller';

@Module({
  imports: [
    SharedModule,
    ConfigModule,
    TypeOrmModule.forFeature([
      ItemLogRepository,
      ItemRepository,
      PropertyRepository,
      WarehouseLogRepository,
      WarehouseRepository,
    ]),
  ],
  providers: [WarehouseService, WarehouseLogService],
  controllers: [WarehouseController],
  exports: [WarehouseService, WarehouseLogService],
})
export class WarehouseModule {}
