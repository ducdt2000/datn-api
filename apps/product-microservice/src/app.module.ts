import { Product } from './product/entities/product.entity';
import { ProductType } from './product/entities/product-type.entity';
import { CommentModule } from './comment/comment.module';
import { SharedModule } from './../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from './config/configuration.module';
import { ProductModule } from './product/product.module';
import { Comment } from './comment/entities/comment.entity';
import { Brand } from './product/entities/brand.entity';
import { Property } from './product/entities/property.entity';
import { CustomProductTemplate } from './product/entities/custom-product-template.entity';
import { CustomProductValue } from './product/entities/custom-product-value.entity';
import { CustomProduct } from './product/entities/custom-product.entity';
import { CustomProperty } from './product/entities/custom-property.entity';

@Module({
  imports: [
    SharedModule,
    ConfigurationModule,
    ProductModule,
    CommentModule,
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
          //commentModule
          Comment,
          //productModule
          Brand,
          ProductType,
          Product,
          Property,
          //custom product
          CustomProductTemplate,
          CustomProductValue,
          CustomProduct,
          CustomProperty,
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
