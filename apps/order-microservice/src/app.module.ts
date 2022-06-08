import { OrderLog } from './order/entities/order-log.entity';
import { Order } from './order/entities/order.entity';
import { SharedModule } from './../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from './config/configuration.module';
import { Item } from './order/entities/item.entity';
import { Property } from './order/entities/property.entity';
import { PaymentMethod } from './order-method/entities/payment-method.entity';
import { DeliveryMethod } from './order-method/entities/delivery-method.entity';

@Module({
  imports: [
    SharedModule,
    ConfigurationModule,
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
        entities: [
          //Order Module
          Order,
          Item,
          OrderLog,
          Property,
          //Method Module
          PaymentMethod,
          DeliveryMethod,
        ],
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
