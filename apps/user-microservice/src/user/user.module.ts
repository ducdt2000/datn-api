import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    SharedModule,
    ConfigModule,
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule,
  ],
  providers: [UserService, AuthService, LocalStrategy],
  controllers: [UserController, AuthController],
  exports: [UserService, AuthService],
})
export class UserModule {}
