import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import { ItemRepository } from './repositories/item.repository';
import { CartRepository } from './repositories/cart.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { PropertyRepository } from './repositories/property.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    SharedModule,
    ConfigModule,
    PassportModule,
    TypeOrmModule.forFeature([
      CartRepository,
      ItemRepository,
      PropertyRepository,
    ]),
  ],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
