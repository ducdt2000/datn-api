import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../config/configuration.module';
import { UserService } from './services/user.service';
@Module({
  imports: [SharedModule, ConfigurationModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [],
})
export class UserModule {}
