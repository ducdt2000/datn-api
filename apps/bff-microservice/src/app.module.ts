import { AuthModule } from './auth/auth.module';
import { SharedModule } from './../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { MediaModule } from './media/media.module';
import { CartModule } from './cart/cart.module';
@Module({
  imports: [
    ConfigurationModule,
    SharedModule,
    AuthModule,
    UserModule,
    ProductModule,
    MediaModule,
    CartModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
