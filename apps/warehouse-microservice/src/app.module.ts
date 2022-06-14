import { Warehouse } from './warehouse/entities/warehouse.entity';
import { WarehouseModule } from './warehouse/warehouse.module';
import { SharedModule } from './../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from './config/configuration.module';
import { ItemLog } from './warehouse/entities/item-log.entity';
import { Item } from './warehouse/entities/item.entity';
import { Property } from './warehouse/entities/property.entity';
import { WarehouseLog } from './warehouse/entities/warehouse-log.entity';

@Module({
  imports: [
    SharedModule,
    ConfigurationModule,
    WarehouseModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number | undefined>('database.port'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.pass'),
        extra: {
          charset: configService.get<string>('database.charset'),
        },
        entities: [ItemLog, Item, Property, WarehouseLog, Warehouse],
        timezone: 'Z',
        synchronize: false,
        debug: configService.get<string>('env') === 'development',
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
