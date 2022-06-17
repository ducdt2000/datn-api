import { AuthModule } from './auth/auth.module';
import { SharedModule } from './../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [
    ConfigurationModule,
    SharedModule,
    AuthModule,
    UserModule,
    ProductModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
