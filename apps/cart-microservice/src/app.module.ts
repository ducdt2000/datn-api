import { CartModule } from './cart/cart.module';
import { ConfigurationModule } from './../../cart-microservice/src/config/configuration.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SharedModule } from './../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './cart/entities/property.entity';
import { Item } from './cart/entities/item.entity';
import { Cart } from './cart/entities/cart.entity';
@Module({
  imports: [
    SharedModule,
    ConfigurationModule,
    CartModule,
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
        entities: [Property, Item, Cart],
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
