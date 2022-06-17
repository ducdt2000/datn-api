import { AuthModule } from './auth/auth.module';
import { SharedModule } from './../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [ConfigurationModule, SharedModule, AuthModule, UserModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
