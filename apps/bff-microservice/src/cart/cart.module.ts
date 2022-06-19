import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../config/configuration.module';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';

@Module({
  imports: [SharedModule, ConfigurationModule],
  providers: [CartService],
  exports: [CartService],
  controllers: [CartController],
})
export class CartModule {}
