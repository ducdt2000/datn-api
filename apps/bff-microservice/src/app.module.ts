import { AuthModule } from './auth/auth.module';
import { SharedModule } from './../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
@Module({
  imports: [ConfigurationModule, SharedModule, AuthModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
