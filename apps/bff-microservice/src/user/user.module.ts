import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../config/configuration.module';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
@Module({
  imports: [SharedModule, ConfigurationModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
